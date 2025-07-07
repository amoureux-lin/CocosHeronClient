import { _decorator, Component, Node } from 'cc';
import { Entry,LayerType } from 'db://framework/core/Framework';
import PdbModel from './model/PdbModel';
import PdbLogic from './logic/PdbLogic';
import { config } from './config/Define';
const { ccclass, property } = _decorator;

export class PdbEntry extends Entry {

    //初始
    onLoad() {
        console.log("PdbEntry onLoad");
        app.gui.addConfig(config);
        app.res.intBundel("pdb");
        PdbModel.getInstance().onload();
        PdbLogic.getInstance().onload();
    }

    
}


