import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabsService {
    tabsToggle: Subject<boolean> = new Subject<boolean>();

    toggleTabs(tabsToggle: boolean): boolean {
        this.tabsToggle.next(tabsToggle);
        return tabsToggle;
    }
}
