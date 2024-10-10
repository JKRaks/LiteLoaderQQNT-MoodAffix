import { Components } from './components/pagecomponents'
import { readConfig, saveConfig } from './common/configcenter';
import { ViewRenderConfig } from "./struct/viewrenderstruct";
import { buildElement } from "./render/renderbuilder";
// 打开设置界面时触发
export const onSettingWindowCreated = (view: Element) => {
    // view 为 Element 对象，修改将同步到插件设置界面
    injetView(view);
    return view;
}

const elec = new Components();
let config = readConfig();

async function injetView(view: Element) {
    if (config instanceof Promise) {
        config = await config;
    }

    let viewConfig = new Array<ViewRenderConfig>();
    viewConfig = [
        {
            BasePanelName: '基础设置',
            BasePanelStyle: null,
            SettingContainer: [
                {
                    Title: '全局启用',
                    Subtitle: '是否启用插件',
                    SettingComponents: elec.getFormSwitch(config.Enable, (e) => {
                        config.Enable = !config.Enable;
                        if (config.Enable) (e.target as Element).setAttribute('is-active', 'is-active');
                        else (e.target as Element).removeAttribute('is-active');
                        saveConfig(config);
                    })
                },
                {
                    Title: '启用C2C',
                    Subtitle: '在私聊中生效',
                    SettingComponents: elec.getFormSwitch(config.EnableC2C, (e) => {
                        config.EnableC2C = !config.EnableC2C;
                        if (config.EnableC2C) (e.target as Element).setAttribute('is-active', 'is-active');
                        else (e.target as Element).removeAttribute('is-active');
                        saveConfig(config);
                    })
                }
            ]
        },
        {
            BasePanelName: '基础词缀设置',
            BasePanelStyle: null,
            SettingContainer: [
                {
                    Title: '间隔符',
                    Subtitle: '词缀和正文的间隔',
                    SettingComponents: elec.getFormInput(config.MoodAffixConfig.Separator, (e) => {
                        config.MoodAffixConfig.Separator = (e.target as any).value;
                        saveConfig(config);
                    })
                },
                {
                    Title: '词缀',
                    Subtitle: '设置尾部词缀',
                    SettingComponents: elec.getFormInput(config.MoodAffixConfig.Affix, (e) => {
                        config.MoodAffixConfig.Affix = (e.target as any).value;
                        saveConfig(config);
                    })
                }
            ]
        }
    ]
    view.appendChild(buildElement(viewConfig));
}