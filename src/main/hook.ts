import { BrowserWindow, WebContents } from 'electron';
import {
    EApiCommand,
    IApiPost,
} from '../struct/messagestruct';

interface WebContentsExtend extends WebContents {
    _events: {
        '-ipc-message': ((...args: unknown[]) => unknown | Array<(...args: unknown[]) => unknown>),
    }
}

const HookApiPreProcesses: {
    command: EApiCommand.SEND_MSG | EApiCommand.REFRESH_CONFIG,
    hookFn: (payload: unknown[]) => unknown[],
}[] = [];

export function hookApiCall(window: BrowserWindow) {
    const webContents = window.webContents as WebContentsExtend;
    let ipcUpMsg;
    if (webContents._events != null) {
        ipcUpMsg = webContents._events['-ipc-message'];
        if (ipcUpMsg instanceof Array) {
            ipcUpMsg = ipcUpMsg[0]
        }

        const ipcUpMsgProxy = new Proxy(ipcUpMsg, {
            apply(target, thisArg, args: IApiPost) {
                if (!args[3][1] || !(args[3][1] instanceof Array) || typeof args[3][1][0] !== 'string') {
                    return target.apply(thisArg, args);
                }

                const newArgs = args;
                try {
                    const [postHead, [postCommand, ...postPayload]] = newArgs[3];

                    if (!!postPayload && postPayload.length > 0) {
                        for (const hook of HookApiPreProcesses) {
                            if (hook.command !== postCommand) continue;
                            const newPostPayload = hook.hookFn([...postPayload]);
                            newArgs[3] = [
                                postHead,
                                [
                                    postCommand,
                                    ...newPostPayload,
                                ]
                            ];
                        }
                    }
                } catch (__) { /* empty */ }

                return target.apply(thisArg, newArgs);
            },
        });

        if (webContents._events['-ipc-message'] instanceof Array) {
            webContents._events['-ipc-message'][0] = ipcUpMsgProxy;
        } else {
            webContents._events['-ipc-message'] = ipcUpMsgProxy;
        }
    }
}

export function addApiPreProcess(postCommand: EApiCommand, hookFn: (payload: unknown[]) => unknown[]): number {
    return HookApiPreProcesses.push({
        command: postCommand,
        hookFn,
    });
}
