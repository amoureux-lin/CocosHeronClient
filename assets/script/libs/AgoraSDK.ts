import AgoraRTC from "agora-rtc-sdk-ng";

export class AgoraSDK{
    
      /** 单例实例 */
  public static readonly instance: AgoraSDK = new AgoraSDK();

    // RTC client instance
    client = null;  
    // Local audio track
    localAudioTrack = null; 
    // Connection parameters
    appId = "<-- Insert app ID -->";
    channel = "<-- Insert channel name -->";
    token = "<-- Insert token -->"; 
    uid = 0; // User ID

    init(appId:string,channel:string,token:string,uid=0){
        this.appId = appId;
        this.channel = channel;
        this.token = token;
        this.uid = uid;
        this.initializeClient();
    }
    
    // Join the channel and publish local audio
    async joinChannel() {
        await this.client.join(this.appId, this.channel, this.token, this.uid);
        await this.createLocalAudioTrack();
        await this.publishLocalAudio();
        console.log("Publish success!");
    }

    // Leave the channel and clean up
    async leaveChannel() {
        this.localAudioTrack.close(); // Stop local audio
        await this.client.leave();    // Leave the channel
        console.log("Left the channel.");
    }

    
    // Initialize the AgoraRTC client
    initializeClient() {
        this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        this.setupEventListeners();
    }

    // Handle client events
    setupEventListeners() {
        // Set up event listeners for remote tracks
        this.client.on("user-published", async (user, mediaType) => {
            // Subscribe to the remote user when the SDK triggers the "user-published" event
            await this.client.subscribe(user, mediaType);
            console.log("subscribe success");
            // If the remote user publishes an audio track.
            if (mediaType === "audio") {
                // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                const remoteAudioTrack = user.audioTrack;
                // Play the remote audio track.
                remoteAudioTrack.play();
            }
        });

        // Listen for the "user-unpublished" event
        this.client.on("user-unpublished", async (user) => {
            // Remote user unpublished
        });
    }

    // Create a local audio track
    async createLocalAudioTrack() {
        this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    }


    // Publish local audio track
    async publishLocalAudio() {
        await this.client.publish([this.localAudioTrack]);
    }

}



// startBasicCall();