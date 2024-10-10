import { ILLApiConfig } from '../struct/llapistruct'
import { IGlobalConfig } from '../struct/pluginconfstruct'
import { log } from './logger';

const llConfig = (globalThis as any).LiteLoader as ILLApiConfig

export function readConfig(): IGlobalConfig {
    let config = null;
    try {
        let confObj = llConfig.api.config.get('mood_affix');
        if (confObj != null && !(confObj instanceof Promise)) {
            config = confObj as IGlobalConfig;
        } else {
            config = confObj;
        }
    } catch (e) {
        log(e)
    };
    if (config == null) {
        config = getInitConfig();
    }
    return config;
}

export function saveConfig(config: IGlobalConfig) {
    llConfig.api.config.set('mood_affix', config);
}

function getInitConfig() {
    let init: IGlobalConfig = {
        MoodAffixConfig: {
            Affix: '',
            Separator: ''
        },
        Enable: false,
        GroupConfig: [],
        IsReadGroupConfig: false,
        EnableC2C: false
    }
    return init;
}