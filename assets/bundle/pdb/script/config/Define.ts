import { LayerType } from "db://framework/core/Framework";
import { UIConfig } from "db://framework/core/ui/base/UIConfig";

export const config: { [key: string]: UIConfig } = {
    "pdbGame":{layer:LayerType.UI,path: "gui/pdbGame",bundle:"pdb",vacancy:true,mask:true}
};