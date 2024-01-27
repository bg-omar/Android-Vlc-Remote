import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface ContentTabsConfiguration {
    icon?: string;
    iconColor?: string;
    text: string;
    textColor?: string;
    selectedTextColor?: string;
    backgroundColor?: string;
    selectedBackgroundColor?: string;
    borderColor?: string;
    selectedBorderColor?: string;
    selected?: boolean;
    compact?: boolean;

    value: any;
}

@Component({
    selector: 'bg-content-tabs',
    templateUrl: './content-tabs.component.html',
    styleUrls: ['./content-tabs.component.scss']
})
export class ContentTabsComponent {
    @Input() tabsConfiguration: ContentTabsConfiguration[] = [];
    @Input() compact: boolean = false;
    @Output() tabClicked: EventEmitter<ContentTabsConfiguration> = new EventEmitter<ContentTabsConfiguration>();

    selectTab(selectedTabConfiguration: ContentTabsConfiguration): void {
        this.tabsConfiguration.forEach((tabConfiguration: ContentTabsConfiguration) => {
            if (tabConfiguration.selected) {
                tabConfiguration.selected = false;
            }
        });
        selectedTabConfiguration.selected = true;
        this.tabClicked.emit(selectedTabConfiguration);
    }
}
