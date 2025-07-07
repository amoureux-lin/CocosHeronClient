import { LayerType } from "db://framework/core/Framework";
import { UIConfig } from "db://framework/core/ui/base/UIConfig";

export const config: { [key: string]: UIConfig } = {
    "Alert": { layer: LayerType.Dialog, path: "common/prefab/alert", vacancy:true,mask: true,bundle:"resources" },
    "Confirm": { layer: LayerType.Dialog, path: "common/prefab/confirm",vacancy:true, mask: true,bundle:"resources" },
};


export const launchConfig: { [key: string]: UIConfig } = {
    "pdbLoading":{layer:LayerType.UI,path: "gui/pdbLoading",bundle:"pdb",vacancy:true,mask:true},
    "fruitLoading":{layer:LayerType.UI,path: "gui/fruitLoading",bundle:"fruit",vacancy:true,mask:true},
};