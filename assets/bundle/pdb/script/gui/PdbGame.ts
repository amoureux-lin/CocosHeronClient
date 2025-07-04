import { _decorator, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PdbGame')
export class PdbGame extends Component{

    @property(Toggle)
    toggleMusic: Toggle = null!;

    protected onLoad(): void {
        this.scheduleOnce(()=>{
            //测试消息
            app.message.dispatchEvent("test",{name:"test"})
        },3)

        this.toggleMusic.isChecked = app.audio.switchMusic;
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
}