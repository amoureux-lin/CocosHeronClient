import { _decorator, Component,director,Node } from 'cc';
import { AudioManager } from 'db://framework/core/audio/AudioManager';

const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    /** 框架常驻节点 */
    private persist: Node = null!

    onLoad() {
        app.onLoad(this.node);
        //测试------------------------
        //本地存储
        app.storage.set("StorageKey", "Test Storage Value");
        console.log(app.storage.get("StorageKey"));

        //初始启动
        app.entryManager.enterGame(1000);
    }

    start() {
    }

    onDestroy() {
        
    }
}


