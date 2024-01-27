import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface TabSwitchConfiguration {
    icon?: string;
    iconColor?: string;
    text: string;
    textColor?: string;
    selectedTextColor?: string;
    selectedBackgroundColor?: string;
    selected?: boolean;
    value: any;
}


@Component({
    selector: 'bg-tab-switch',
    templateUrl: './tab-switch.component.html',
    styleUrls: ['./tab-switch.component.scss']
})
export class TabSwitchComponent {
    @Input() tabsConfiguration: TabSwitchConfiguration[] = [];
    @Input() compact: boolean = false;
    @Output() tabClicked: EventEmitter<TabSwitchConfiguration> = new EventEmitter<TabSwitchConfiguration>();

    selectTab(selectedTabConfiguration: TabSwitchConfiguration): void {
        this.tabsConfiguration.forEach((tabConfiguration: TabSwitchConfiguration): void => {
            if (tabConfiguration.selected) {
                tabConfiguration.selected = false;
            }
        });
        selectedTabConfiguration.selected = true;
        this.tabClicked.emit(selectedTabConfiguration);
    }
}
