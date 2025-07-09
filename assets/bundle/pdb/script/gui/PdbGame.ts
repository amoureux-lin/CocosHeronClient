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
            appId:"5e045e02a8c14a99a590e28d8e86a2e8",
            channel:"123",
            token:"007eJxTYPij0y/zLbZY4Gzs1svf2eV5w3JYl1yzVrjHK96ydzdHnq0Cg2mqgQkQGyVaJBuaJFpaJppaGqQaWaRYpFqYJRqlWsSU5WQ0BDIynPK3Y2CEQhCfmcHQyJiBAQCRkxvs",
            uid:0,
        });

        // 获取一致的设备指纹
        this.getUUID();
    }

    async getUUID(){
        try {
            // 获取稳定的Canvas指纹
            const canvasFingerprint = await app.frameWorkUtil.default.getCanvasFingerprint();
            console.log('Canvas指纹:', canvasFingerprint);

            // 获取完整指纹
            const completeFingerprint = await app.frameWorkUtil.default.getCompleteFingerprint();
            console.log('完整指纹:', completeFingerprint);

            // 获取详细指纹摘要
            const summary = await app.frameWorkUtil.default.getFingerprintSummary();
            console.log('指纹摘要:', summary);

            // 验证一致性
            const isConsistent = await app.frameWorkUtil.default.verifyConsistency();
            console.log('指纹一致性:', isConsistent);

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