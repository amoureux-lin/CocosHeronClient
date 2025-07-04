import { _decorator, Component, Node } from 'cc';
import { Entry, registerEntry,LayerType } from 'db://framework/core/Framework';
import PdbModel from './model/PdbModel';
import PdbLogic from './logic/PdbLogic';
const { ccclass, property } = _decorator;

@registerEntry('PdbEntry','pdb')
export class PdbEntry extends Entry {
    /** 游戏ID */
    gameId: number = 1000;

    /** 开始UI */
    lunchUI:string = "pdbLoading";

    /** UI配置 */
    config={
        "pdbLoading":{layer:LayerType.UI,path: "gui/pdbLoading",bundle:"pdb",vacancy:true,mask:true},
        "pdbGame":{layer:LayerType.UI,path: "gui/pdbGame",bundle:"pdb",vacancy:true,mask:true}
    }

    //初始
    onLoad() {
        app.res.intBundel("pdb");
        PdbModel.getInstance().onload();
        PdbLogic.getInstance().onload();
    }

    
}


