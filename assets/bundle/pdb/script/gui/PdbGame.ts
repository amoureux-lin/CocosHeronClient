import { _decorator, Component, Node, Toggle } from 'cc';
import AgoraSDK from 'db://assets/script/libs/AforaSDK';

const { ccclass, property } = _decorator;

@ccclass('PdbGame')
export class PdbGame extends Component{

    agoraSDK:AgoraSDK;

    @property(Toggle)
    toggleMusic: Toggle = null!;

    protected onLoad(): void {
        this.scheduleOnce(()=>{
            //测试消息
            app.message.dispatchEvent("test",{name:"test"})
        },3)

        this.toggleMusic.isChecked = app.audio.switchMusic;

        this.agoraSDK = new AgoraSDK({
            appId:"4d5b5a3bd6634c489bb36018e5d1a324",
            channel:"123",
            token:"007eJxTYOiQm771Vw6XPfMTg+OBl7jrV5ooqIXvLPAX13b+8W/v3nUKDCYppkmmicZJKWZmxibJJhaWSUnGZgaGFqmmKYaJxkYmukJ5GQ2BjAw1Sx1YGRkgEMRnZjA0MmZgAACzUxxG",
            uid:1230,
        });

        // 获取一致的设备指纹
        this.getUUID();
    }

    async getUUID(){
        try {
            // 获取完整指纹
            const completeFingerprint = await app.frameWorkUtil.default.getFingerprint();
            console.log('完整指纹:', completeFingerprint);

        } catch (error) {
            console.error('指纹生成失败:', error);
        }
    }

    clickMusic() {
        app.audio.switchMusic = !app.audio.switchMusic;
        app.audio.switchMusic
        if (app.audio.switchMusic) {    
            app.audio.playBundleMusic('bgm', true);
        } else {
            app.audio.stopMusic();
        }
    }

    clickJoinAudio(){
        this.agoraSDK.joinChannel();
    }

    clickExitAudio(){
        this.agoraSDK.leaveChannel();
    }


}