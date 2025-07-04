import { _decorator, Component, Node } from 'cc';
import { Entry, Framework, LayerType, registerEntry } from 'db://framework/core/Framework';

const { ccclass, property } = _decorator;

@registerEntry('AppEntry','resources')
export class AppEntry extends Entry {
    isMain=true;
    /** 公共UI配置 */
    config={
        "Alert": { layer: LayerType.Dialog, path: "common/prefab/alert", vacancy:true,mask: true,bundle:"resources" },
        "Confirm": { layer: LayerType.Dialog, path: "common/prefab/confirm",vacancy:true, mask: true,bundle:"resources" },
    }

    onLoad(): void {
        console.log('AppEntry onload');
        console.log("查询参数：",app.query.data)
        
    }
}

