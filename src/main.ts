import { BrowserWindow } from "electron";
import { addApiPreProcess, hookApiCall } from "./main/hook";
import { EApiCommand, IMessageData } from "./struct/messagestruct";
import { doTextProcessing } from "./main/processcenter";
import { log } from "./common/logger";

// 运行在 Electron 主进程 下的插件入口

// 创建窗口时触发
module.exports.onBrowserWindowCreated = (window: BrowserWindow) => {
    // window 为 Electron 的 BrowserWindow 实例
    hookApiCall(window);
}

addApiPreProcess(EApiCommand.SEND_MSG, (payload): unknown[] => {
    let newPayload = payload;
    try {
        log(payload);
        newPayload[0] = doTextProcessing(payload[0] as IMessageData);
        log(newPayload);
    } catch (e) {
        newPayload = payload;
        log(e);
    }
    return newPayload;
});