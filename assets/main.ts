import { _decorator, Component,director,Game,game,Node } from 'cc';
import { AudioManager } from 'db://framework/core/audio/AudioManager';
import { CommonEvent } from './script/common/config/CommonEvent';

const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    /** 框架常驻节点 */
    private persist: Node = null!

    onLoad() {
        app.onLoad(this.node);
         // 游戏显示事件
        game.on(Game.EVENT_SHOW, this.onShow, this);
        // 游戏隐藏事件
        game.on(Game.EVENT_HIDE, this.onHide, this);
        // //测试------------------------
        // //本地存储
        // app.storage.set("StorageKey", "Test Storage Value");
        // console.log(app.storage.get("StorageKey"));
    }

    protected start(): void {
        //根据游戏ID初始启动游戏
        app.entryManager.enterGame(1001);
    }

    onDestroy() {
        
    }

    
    private onShow() {
        // app.timer.load();              // 处理回到游戏时减去逝去时间
        app.audio.resumeAll();         // 恢复所有暂停的音乐播放
        director.resume();              // 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生
        game.resume();                  // 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效
        app.message.dispatchEvent(CommonEvent.GAME_SHOW);
    }

    private onHide() {
        // app.timer.save();             // 处理切到后台后记录切出时间
        app.audio.pauseAll();         // 暂停所有音乐播放
        director.pause();              // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。 如果想要更彻底得暂停游戏，包含渲染，音频和事件
        game.pause();                  // 暂停游戏主循环。包含：游戏逻辑、渲染、输入事件派发（Web 和小游戏平台除外）
        app.message.dispatchEvent(CommonEvent.GAME_HIDE);
    }

}


