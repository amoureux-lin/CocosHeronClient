import { CommonEvent } from "db://assets/script/common/config/CommonEvent";

export default class PdbLogic{

    private static instance: PdbLogic = null;
    public static getInstance(): PdbLogic {
        this.instance = this.instance || new PdbLogic();
        return this.instance;
    }

    onload() {
        this.resgisterEvent();
    }

    destroy(){
        this.removeEvent();
    }

    protected init(){

    }

    resgisterEvent() {
        //注册游戏事件
        app.message.on(CommonEvent.GAME_SHOW,this);
        app.message.on(CommonEvent.GAME_HIDE, this);
        app.message.on("test",this)
    }

    removeEvent() {
        //移除游戏事件
        app.message.off(CommonEvent.GAME_SHOW, this);
        app.message.off(CommonEvent.GAME_HIDE, this);
        app.message.off("test",this)
    }

    onHandler(event: string, ...args: any[]) {
        switch (event) {
            case CommonEvent.GAME_SHOW:
                console.log("游戏进入前台");
                break;
            case CommonEvent.GAME_HIDE:
                console.log("游戏进入后台");
                break;
            case "test":
                console.log('接收到消息test');
            break;
            default:
                break;
        }
    }

        

}