import { EventMessage } from "db://framework/core/Framework";

/** 游戏事件 */
export class CommonEvent extends EventMessage {
    /** 游戏服务器连接成功 */
    static GameServerConnected = "GameServerConnected";
    /** 登陆成功 */
    static staticLoginSuccess = "LoginSuccess";
}