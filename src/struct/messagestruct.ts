export enum EMessageType {
    TEXT = 1,
    PIC = 2,
    FILE = 3,
    PTT = 4,
    FACE = 6,
    REPLY = 7,
}

export enum EApiCommand {
    SEND_MSG = 'nodeIKernelMsgService/sendMsg',
    REFRESH_CONFIG = 'moodAffixService/refreshConfig'
}

export interface IApiHead {
    eventName: string,
    callbackId?: string,
    type: 'request' | 'response',
}

export interface IApiPost<IPayload = unknown> extends Array<unknown> {
    0: {
        frameId: number,
        processId: number,
    },
    1: boolean,
    2: string,
    3: [
        IApiHead,
        [
            string,
            ...IPayload[],
        ]
    ]
}

export interface IMessageData {
    msgId: string,
    peer: IMessagePeer,
    msgElements: IMessageElement[],
    msgAttributeInfos: unknown,
}

export interface IMessagePeer {
    chatType: number,
    peerUid: string,
    guildId: string,
}

export interface IMessageElement {
    elementType: EMessageType,
    elementId: string,
}

export interface IMessageElementText extends IMessageElement {
    elementType: EMessageType.TEXT,
    textElement: {
        content: string,
        atType: number, // 0=纯文本消息
        atUid: string,
        atTinyId: string,
        atNtUid: string,
    }
}
