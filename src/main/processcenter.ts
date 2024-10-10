import { EMessageType, IMessageData, IMessageElement, IMessageElementText, IMessagePeer } from "../struct/messagestruct";
import { readConfig } from "../common/configcenter";

/**
 * 执行文本消息处理
 * @param msgData 消息体
 * @returns 调整后的消息体
 */
export function doTextProcessing(msgData: IMessageData): IMessageData {
    const newMsgElements: IMessageElement[] = [...msgData.msgElements];
    const peer = msgData.peer;
    for (let msgElement of newMsgElements) {
        if (msgElement.elementType !== EMessageType.TEXT) continue;
        if ((msgElement as IMessageElementText).textElement.atType !== 0) continue;
        msgElement = excuteContent(msgElement as IMessageElementText, peer);
    }

    return {
        msgId: msgData.msgId,
        peer: msgData.peer,
        msgElements: newMsgElements,
        msgAttributeInfos: msgData.msgAttributeInfos,
    };
}

/**
 * 构建消息体
 * @param msgElement 消息实体
 * @param peer 发送者信息
 */
function excuteContent(msgElement: IMessageElementText, peer: IMessagePeer) {
    let config = readConfig();
    const content = msgElement.textElement.content;
    let separator = '';
    let affix = '';
    if (config.Enable) {
        if (peer.chatType == 1 && config.EnableC2C) {
            separator = config.MoodAffixConfig.Separator;
            affix = config.MoodAffixConfig.Affix;
        } else if (peer.chatType == 2) {
            if (config.IsReadGroupConfig) {
                let groupConfig = config.GroupConfig.filter(s => s.GroupId == peer.peerUid)?.[0];
                if (groupConfig?.Enable) {
                    separator = groupConfig.MoodAffixConfig?.Separator ?? '';
                    affix = groupConfig.MoodAffixConfig?.Affix ?? '';
                }
            } else {
                separator = config.MoodAffixConfig.Separator;
                affix = config.MoodAffixConfig.Affix;
            }
        }
    }
    msgElement.textElement.content = joinContent(content, affix, separator);
    return msgElement;
}

function joinContent(content: string, affix: string, separator: string) {
    return content + separator + affix;
}