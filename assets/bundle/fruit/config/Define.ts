import { LayerType } from "db://framework/core/Framework";
import { UIConfig } from "db://framework/core/ui/base/UIConfig";

export const config: { [key: string]: UIConfig } = {
    "fruitGame":{layer:LayerType.UI,path: "gui/fruitGame",bundle:"fruit",vacancy:true,mask:true}
};