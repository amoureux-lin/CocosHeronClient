import { Component, Label, ProgressBar,SpriteFrame,_decorator, assetManager } from "cc";
import { AsyncQueue,i18n,NextFunction } from "db://framework/core/Framework";

const win = window as any;
const { ccclass, property } = _decorator;
export class BaseLoading extends Component{

    @property(ProgressBar)
    private progressBar:ProgressBar = null!;

    @property(Label)
    private progressLabel:Label = null!;

    // 公共资源加载进度
    protected commonProgress:number = 0;
    // 资源加载进度
    protected resProgress:number = 0;
    // 游戏内容加载进度
    protected guiProgress:number = 0;

    // 公共资源加载进度占比
    protected commonRate:number = 0.3;
    // 资源加载进度占比
    protected resRate:number = 0.5;
    // 游戏内容加载进度占比
    protected guiRate:number = 0.2;

    onLoad(){
        this.commonProgress = 0;
        this.resProgress = 0;
        this.guiProgress = 0;
        this.loadRes();
    }

    protected loadRes(){
        var queue: AsyncQueue = new AsyncQueue();
        this.loadLanguage(queue);
        // 加载公共资源
        this.loadCommon(queue);
       // 加载资源
       this.loadCustomRes(queue);
      
       // 加载游戏内容加载进度提示界面
       this.onComplete(queue);

       queue.play();
    }

    private loadLanguage(queue: AsyncQueue){
        queue.push(async (next: NextFunction, params: any, args: any) => {
            app.res.loadBundleDir(i18n.getLanguage(),'main/res',next())
        });
        queue.push(async (next: NextFunction, params: any, args: any) => {
            app.res.loadBundleDir(i18n.getLanguage(),app.res.currentBundle+'/res',next())
        });
    }

    /** 加载公共资源（必备） */
    protected loadCommon(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            app.res.loadCommonDir("common",(finished:number,total:number,item:any)=>{
                this.commonProgress = (finished/total) * this.commonRate;
                this.updateProgress();
            },()=>{
                next();
            });
        });
    }

        /** 加载资源 */
    loadCustomRes(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            this.playBg();
            app.res.loadDir('res',(finished:number,total:number,item:any)=>{
                this.resProgress = (finished/total) * this.resRate;
                this.updateProgress();
            },()=>{
                next();
            });
        });
        
        queue.push((next: NextFunction, params: any, args: any) => {
            app.res.loadDir('gui',(finished:number,total:number,item:any)=>{
                this.guiProgress = (finished/total) * this.guiRate;
                this.updateProgress();
            },next);
        });
    }


    /**
     * 更新进度条以及百分比
     */
    protected updateProgress(){
        let progress = this.commonProgress + this.resProgress+this.guiProgress;
        if(progress > 1) progress = 1;
        
        this.progressBar.progress = progress;
        this.progressLabel.string = `${Math.round(progress*100)}%`;
    }

    /** 加载完成进入游戏内容加载界面 */
    private onComplete(queue: AsyncQueue) {
        queue.complete = async () => {
            this.updateProgress();
            this.loadComplete();
        };
    }

    //播放背景音乐
    protected playBg(){

    }

    /** 加载完成 */
    protected loadComplete(): void {
        // 子类需要重写此方法来实现具体的加载完成逻辑
        console.error("子类需要重写此方法来实现具体的加载完成逻辑");
        
    }
}