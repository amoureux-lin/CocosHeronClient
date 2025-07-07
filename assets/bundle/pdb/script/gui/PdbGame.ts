import { _decorator, Component, Node, Toggle } from 'cc';
import { AgoraSDK } from 'db://assets/script/libs/AgoraSDK';
const { ccclass, property } = _decorator;

@ccclass('PdbGame')
export class PdbGame extends Component{

    agoraSDK:AgoraSDK = AgoraSDK.instance;

    @property(Toggle)
    toggleMusic: Toggle = null!;

    protected onLoad(): void {
        this.scheduleOnce(()=>{
            //测试消息
            app.message.dispatchEvent("test",{name:"test"})
        },3)

        this.toggleMusic.isChecked = app.audio.switchMusic;

        // this.agoraSDK = new AgoraSDK({
        //     appId:"b4a9b4aba68e467ab4008c29a0709d26",
        //     channel:"cocos",
        //     token:"07eJxTYFC9ULpM/nu2/rF0nZtiLaLJa/ZMd17Yaf2D/YnS2h3n858qMCSZJFoCcVKimUWqiZl5YpKJgYFFspFlooG5gWWKkdnlxuyMhkBGhrkC/xkYoRDEZ2VIzk/OL2ZgAACgdyDI",
        //     uid:0,
        // })

        this.agoraSDK.init('5e045e02a8c14a99a590e28d8e86a2e8','123','007eJxTYJiesDZHbqq3nLtFiPPncxtmsvaLJUh9WKkcuYtLt2a6r6ACg2mqgQkQGyVaJBuaJFpaJppaGqQaWaRYpFqYJRqlWlR0ZGc0BDIyZCTcY2VkgEAQn5nB0MiYgQEAStgbgg==')
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