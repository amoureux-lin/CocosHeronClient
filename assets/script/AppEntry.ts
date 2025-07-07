import { Entry } from 'db://framework/core/Framework';
import { config, launchConfig } from './config/Define';

export class AppEntry extends Entry {

    onLoad(): void {
        console.log('AppEntry onload');
        console.log("查询参数：",app.query.data);
        //初始公共UI配置
        app.gui.initConfig(config);
        //添加启动场景配置
        app.gui.addConfig(launchConfig);
    }
}

