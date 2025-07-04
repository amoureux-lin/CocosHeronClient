import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PdbGame')
export class PdbGame extends Component{
    protected onLoad(): void {
        this.scheduleOnce(()=>{
            //测试消息
            app.message.dispatchEvent("test",{name:"test"})
        },3)
    }
}