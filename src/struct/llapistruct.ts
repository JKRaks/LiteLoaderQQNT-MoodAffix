export interface ILLApiConfig {
    path: {
        /**
         * 本体目录路径
         */
        root: string,
        /**
         * 存储目录路径（如果指定了 LITELOADERQQNT_PROFILE 环境变量）
         */
        profile: string,
        /**
         * 数据目录路径
         */
        data: string,
        /**
         * 插件目录路径
         */
        plugins: string
    },
    versions: {
        /**
         * QQNT 版本号
         */
        qqnt: string,
        /**
         * LiteLoaderQQNT 版本号
         */
        liteloader: string,
        /**
         * Node.js 版本号
         */
        node: string,
        /**
         * Chrome 版本号
         */
        chrome: string,
        /**
         * Electron 版本号
         */
        electron: string
    },
    os: {
        /**
         * 系统平台名称
         */
        platform: string
    },
    package: {
        /**
         * LiteLoaderQQNT package.json 文件内容
         */
        liteloader: string,
        /**
         * QQNT package.json 文件内容
         */
        qqnt: string
    },
    plugins: any,
    api: {
        /**
         * 打开指定目录
         * @param path 目录
         */
        openPath(path: string): void,
        /**
         * 打开外部连接
         * @param uri 链接
         */
        openExternal(uri: string): void,
        config: {
            /**
             * 设置配置文件
             * @param slug 插件
             * @param new_config 新配置文件
             */
            set(slug: string, default_config: any): any,
            /**
             * 获取配置文件
             * @param slug 插件
             * @param default_config 默认配置文件
             */
            get(slug: string, default_config?: string): any
        }
    }
}