import AgoraRTC, {
    IAgoraRTCClient,
    IMicrophoneAudioTrack,
    IAgoraRTCRemoteUser,
    UID,
    ConnectionState,
    ConnectionDisconnectedReason,
    NetworkQuality
} from "agora-rtc-sdk-ng";

interface AgoraConfig {
    appId: string;
    channel: string;
    token: string;
    uid?: UID;
}

export default class AgoraSDK {

    private client: IAgoraRTCClient | null = null;
    private localAudioTrack: IMicrophoneAudioTrack | null = null;
    private appId: string;
    private channel: string;
    private token: string;
    private uid: UID;

    constructor(config: AgoraConfig) {
        this.appId = config.appId;
        this.channel = config.channel;
        this.token = config.token;
        this.uid = config.uid || 0;

        this.initializeClient();
    }

    /**
     * 初始化 Agora RTC 客户端
     */
    private initializeClient(): void {
        this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        this.setupEventListeners();
    }

    /**
     * 设置客户端事件监听器
     */
    private setupEventListeners(): void {
        if (!this.client) return;

        // 监听远程用户发布音频流事件
        this.client.on("user-published", this.userPublished);

        // 监听远程用户取消发布事件
        this.client.on("user-unpublished", this.userUnPublished);
        this.client.on("connection-state-change",this.connectionStateChange);
        //用户加入
        this.client.on("user-joined",this.userJoin);
        ////远程用户离线时
        this.client.on("user-left",this.userLeft);
        //网络质量
        this.client.on("network-quality",this.networkQuality);
    }


    //用户发布音频流事件
    private async userPublished(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video"){
        try {
                // 订阅远程用户的媒体流
                await this.client!.subscribe(user, mediaType);
                console.log("subscribe success");

                // 如果远程用户发布音频流
                if (mediaType === "audio") {
                    // 获取远程音频轨道
                    const remoteAudioTrack = user.audioTrack;
                    if (remoteAudioTrack) {
                        // 播放远程音频流
                        remoteAudioTrack.play();
                    }
                }
            } catch (error) {
                console.error("Failed to subscribe to remote user:", error);
            }
    }

    //用户取消发布音频流事件
    private async userUnPublished(user: IAgoraRTCRemoteUser){
        // 可以在这里处理远程用户离开的逻辑
    }

    //链接状态改变
    private async connectionStateChange(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason){
        
    }

    //用户加入
    private async userJoin(user: IAgoraRTCRemoteUser){
        // 可以在这里处理用户加入的逻辑
    }

    //远程用户离线时
    private async userLeft(user: IAgoraRTCRemoteUser, reason: string){
        
    }
    //网络质量
    private async networkQuality(stats: NetworkQuality){
        
    }
    

    /**
     * 创建本地音频轨道
     */
    private async createLocalAudioTrack(): Promise<void> {
        try {
            this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        } catch (error) {
            console.error("Failed to create local audio track:", error);
            throw error;
        }
    }

    /**
     * 加入频道并发布本地音频
     */
    public async joinChannel(): Promise<void> {
        if (!this.client) {
            throw new Error("Client not initialized");
        }

        try {
            console.log(this.appId, this.channel, this.token, this.uid);
            
            // 加入频道
            await this.client.join(this.appId, this.channel, this.token, this.uid);

            // 创建本地音频轨道
            await this.createLocalAudioTrack();

            // 发布本地音频
            await this.publishLocalAudio();

            console.log("Publish success!");
        } catch (error) {
            console.error("Failed to join channel:", error);
            throw error;
        }
    }

    /**
     * 发布本地音频轨道
     */
    private async publishLocalAudio(): Promise<void> {
        if (!this.client || !this.localAudioTrack) {
            throw new Error("Client or local audio track not available");
        }

        try {
            await this.client.publish([this.localAudioTrack]);
        } catch (error) {
            console.error("Failed to publish local audio:", error);
            throw error;
        }
    }

    /**
     * 离开频道并清理资源
     */
    public async leaveChannel(): Promise<void> {
        try {
            // 停止本地音频轨道
            if (this.localAudioTrack) {
                this.localAudioTrack.close();
                this.localAudioTrack = null;
            }

            // 离开频道
            if (this.client) {
                await this.client.leave();
            }

            console.log("Left the channel.");
        } catch (error) {
            console.error("Failed to leave channel:", error);
            throw error;
        }
    }

    /**
     * 静音/取消静音本地音频
     */
    public async toggleMute(): Promise<boolean> {
        if (!this.localAudioTrack) {
            console.warn("Local audio track not available");
            return false;
        }

        try {
            if (this.localAudioTrack.enabled) {
                await this.localAudioTrack.setEnabled(false);
                console.log("Audio muted");
                return false;
            } else {
                await this.localAudioTrack.setEnabled(true);
                console.log("Audio unmuted");
                return true;
            }
        } catch (error) {
            console.error("Failed to toggle mute:", error);
            throw error;
        }
    }

    /**
     * 获取当前连接状态
     */
    public getConnectionState(): string {
        return this.client?.connectionState || "DISCONNECTED";
    }

    /**
     * 销毁实例并清理所有资源
     */
    public async destroy(): Promise<void> {
        await this.leaveChannel();
        this.client = null;
    }
}
