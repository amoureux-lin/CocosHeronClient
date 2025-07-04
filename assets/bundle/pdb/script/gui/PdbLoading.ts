import { _decorator, Component, Node } from 'cc';
import { BaseLoading } from 'db://assets/script/common/loading/BaseLoading';
const { ccclass, property } = _decorator;

@ccclass('PdbLoading')
export class PdbLoading extends BaseLoading {

    //以下总体比例应该为1
    // 公共资源加载进度占比
    commonRate:number = 0.3;
    // 资源加载进度占比
    resRate:number = 0.5;
    // 游戏内容加载进度占比
    guiRate:number = 0.2;

    onload() {
        super.onLoad();
    }

    //加载音乐
    playBg(){
        app.audio.playBundleMusic('bgm',true);
    }

    //资源加载完成
    loadComplete(): void {
        console.log("资源加载完成=》跳转页面");
        app.gui.open("pdbGame");
    }

    update(deltaTime: number) {
        
    }
}


