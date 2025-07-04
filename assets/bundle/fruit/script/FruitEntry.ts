import { _decorator, Component, Node } from 'cc';
import { Entry, registerEntry,LayerType } from 'db://framework/core/Framework';
const { ccclass, property } = _decorator;

@registerEntry('FruitEntry','fruit')
export class FruitEntry extends Entry {
    /** 游戏ID */
    gameId: number = 1001;

    /** 开始UI */
    lunchUI:string = "fruitLoading";

    /** UI配置 */
    config={
        "fruitLoading":{layer:LayerType.UI,path: "gui/fruitLoading",bundle:"fruit",vacancy:true,mask:true},
        "fruitGame":{layer:LayerType.UI,path: "gui/fruitGame",bundle:"fruit",vacancy:true,mask:true}
    }

    //初始
    onLoad() {
        console.log('FruitEntry onload');
        app.res.intBundel("fruit");
    }

    
}


