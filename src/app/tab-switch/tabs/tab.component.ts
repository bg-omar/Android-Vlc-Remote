import {Component, Input} from '@angular/core';

@Component({
    selector: 'bg-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabComponent {
    @Input('tabTitle') tabTitle: string;
    @Input('tabIcon') tabIcon?: string;
    @Input() selected: boolean;
}
