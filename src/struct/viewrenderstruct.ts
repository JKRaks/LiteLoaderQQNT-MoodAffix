export interface ViewRenderConfig {
    BasePanelName: string,
    BasePanelStyle: ViewRenderPanelConfig | null,
    SettingContainer: Array<ViewRenderSettingContainerConfig>
}

export interface ViewRenderSettingContainerConfig {
    Title: string,
    Subtitle: string | null,
    SettingComponents: HTMLElement
}

export interface ViewRenderPanelConfig {
    Title: string | null,
    Direction: string | null,
    Collapsible: boolean | null
}