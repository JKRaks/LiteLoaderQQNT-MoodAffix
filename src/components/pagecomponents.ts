export class Components {
    /**
     * 创建基础容器
     * @param title 标题 可为空
     * @returns selection 元素
     */
    getBaseSection(title: string = '') {
        let section = document.createElement('setting-selection');
        section.setAttribute('data-title', title);
        return section;
    }

    /**
     * 创建选项容器
     * @returns panel
     */
    getPanel() { return document.createElement('setting-panel'); }

    /**
     * 创建列表容器
     * @param direction 排序方式 row横向 column纵向
     * @param collapsible 是否为可折叠列表
     * @param title 可折叠列表标题
     * @returns list元素
     */
    getListContainer(title: string = '', direction: string = 'column', collapsible: boolean = false) {
        let list = document.createElement('setting-list');
        list.setAttribute('data-direction', direction);
        if (title != '')
            list.setAttribute('data-title', title);
        if (collapsible) {
            list.setAttribute('is-collapsible', 'is-collapsible')
        }
        return list;
    }

    /**
     * 创建列表条目
     * @param direction 排序方式 自动跟随
     * @returns setting-item元素
     */
    getListItem(direction: string = '') {
        let item = document.createElement('setting-item');
        if (direction != '') {
            item.setAttribute('data-direction', direction);
        }
        return item;
    }

    /**
     * 创建下拉框
     * @param callback 选中回调
     * @returns setting-select元素
     */
    getFormSelect() {
        let select = document.createElement('setting-select');
        return select;
    }

    /**
     * 获取下拉框选项
     * @param value 选项值
     * @param text 选项名
     * @returns select-option元素
     */
    getFormSelectOption(value: string, text: string) {
        let option = document.createElement('setting-option');
        option.setAttribute('data-value', value);
        option.innerText = text;
        return option;
    }

    /**
     * 创建开关
     * @param active 是否激活
     * @returns setting-switch元素
     */
    getFormSwitch(active: boolean, callback = (e: Event) => { }) {
        let switcher = document.createElement('setting-switch');
        if (active) switcher.setAttribute('is-active', 'is-active');
        switcher.addEventListener('click', callback);
        return switcher;
    }

    /**
     * 创建按钮
     * @param isPrimary 是否为主要元素
     * @param disabled 是否启用
     * @param callback 回调函数
     * @returns setting-button元素
     */
    getFormButton(isPrimary: boolean = false, disabled: boolean = false) {
        let button = document.createElement('setting-button');
        if (isPrimary) button.setAttribute('data-type', 'primary');
        else button.setAttribute('data-type', 'secondary');
        if (disabled) button.setAttribute('disabled', 'disabled');
        return button;
    }

    /**
     * 获取Input元素
     * @param value 默认值
     * @param callback 回调
     * @returns Input元素
     */
    getFormInput(value: string = '', callback = (e: Event) => { }) {
        let outerDiv = document.createElement('div');
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'q-input question-input')
        mainDiv.style.border = '1px solid #efefef';
        let input = document.createElement('input');
        input.setAttribute('value', value);
        input.setAttribute('class', 'q-input__inner');
        input.addEventListener('input', callback)
        mainDiv.appendChild(input);
        outerDiv.appendChild(mainDiv);
        return outerDiv;
    }

    /**
     * 创建text元素
     * @param innerHtml 内容信息
     * @param isPrimary 主要文字元素
     * @returns setting-text元素
     */
    getText(innerHtml: string, isPrimary: boolean = false) {
        let text = document.createElement('setting-text');
        if (!isPrimary) text.setAttribute('data-type', 'secondary');
        text.innerHTML = innerHtml;
        return text;
    }
}