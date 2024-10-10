export interface IGlobalConfig {
    /**
     * 全局状态
     */
    Enable: boolean,
    /**
     * 分群组设置
     */
    GroupConfig: Array<IGlobalConfigGroups>,
    /**
     * 是否读取群组配置
     */
    IsReadGroupConfig: boolean,
    /**
     * 全局词缀配置
     */
    MoodAffixConfig: IGlobalConfigMoodAffix,
    /**
     * 单聊生效
     */
    EnableC2C: boolean
}

/**
 * 群组配置
 */
export interface IGlobalConfigGroups {
    /**
     * 群组Id
     */
    GroupId: string,
    /**
     * 当前群组词缀配置
     */
    MoodAffixConfig: IGlobalConfigMoodAffix,
    /**
     * 是否启用
     */
    Enable: boolean
}

/**
 * 词缀配置
 */
export interface IGlobalConfigMoodAffix {
    /**
     * 句尾词缀分隔符
     */
    Separator: string,
    /**
     * 词缀
     */
    Affix: string
}
