
export default class PdbLogic{

    private static instance: PdbLogic = null;
    public static getInstance(): PdbLogic {
        this.instance = this.instance || new PdbLogic();
        return this.instance;
    }

    onload() {
        this.onMsg();
    }

    destroy(){
        this.offMsg();
    }

    onMsg(){
        app.message.on("test",this)
    }

    offMsg(){
        app.message.off("test",this)
    }

    protected init(){

    }


    onHandler(msg:string,event:{ [key:string]:any }){
        switch(msg){
            case "test":
                console.log('接收到消息test');
                break;
        }
    }

}