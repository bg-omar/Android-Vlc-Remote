import {Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Input} from '@angular/core';
import {TabsService} from './tabs.service';
import {TabComponent} from './tab.component';

@Component({
    selector: 'bg-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabPanes: QueryList<TabComponent>;
    @Input() withMargin: boolean = true;
    @Input() isCompact: boolean = false;
    @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor(private tabsService: TabsService) {
    }

    ngAfterContentInit(): void {
        const activeTabs = this.tabPanes.filter((tab: TabComponent) => tab.selected);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabPanes.first);
        }
    }

    selectTab(tabComponent: TabComponent): void {
        this.tabPanes.toArray().forEach((tab: TabComponent) => tab.selected = false);
        tabComponent.selected = true;
        this.tabsService.toggleTabs(true);
        this.tabSelected.emit(tabComponent.tabTitle);
    }
}
