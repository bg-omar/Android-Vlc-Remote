import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {TabComponent} from './tab.component';
import {BgIconModule} from '../../icon/icon.module';

@NgModule({
    declarations: [TabComponent, TabsComponent],
    imports: [
        CommonModule,
        BgIconModule
    ],
    exports: [
        TabComponent,
        TabsComponent
    ]
})
export class BgTabsModule {
}
