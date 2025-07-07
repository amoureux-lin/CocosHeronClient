import { _decorator} from 'cc';
import { Entry } from 'db://framework/core/Framework';
import { config } from '../config/Define';
const { ccclass, property } = _decorator;

export class FruitEntry extends Entry {

    //初始
    onLoad() {
        console.log('FruitEntry onload');
        app.gui.addConfig(config);
        app.res.intBundel("fruit");
    }

    
}


