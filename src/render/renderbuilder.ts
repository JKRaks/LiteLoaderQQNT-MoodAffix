import { ViewRenderConfig } from "../struct/viewrenderstruct";
import { Components } from '../components/pagecomponents'

const elec = new Components();
export function buildElement(config: Array<ViewRenderConfig>): Element {
    let element = document.createElement('div');
    config.forEach(s => {
        let mainSetting = elec.getBaseSection(s.BasePanelName);
        let mainPanel = elec.getPanel();
        let baseSetting = elec.getListContainer();
        s.SettingContainer.forEach(c => {
            let item = elec.getListItem();
            let title = document.createElement('div');
            title.appendChild(elec.getText(c.Title, true))
            if (c.Subtitle != null) {
                title.appendChild(elec.getText(c.Subtitle, false))
            }
            item.appendChild(title);
            item.appendChild(c.SettingComponents);
            baseSetting.appendChild(item);
            mainPanel.appendChild(baseSetting);
            mainSetting.appendChild(mainPanel);
            element.appendChild(mainSetting);
        });
    })

    return element;
}