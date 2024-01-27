import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TabSwitchComponent} from './tab-switch.component';
import {BgIconModule} from '../icon/icon.module';

@NgModule({
    declarations: [
        TabSwitchComponent
    ],
    imports: [
        CommonModule,
        BgIconModule
    ],
    providers: [],
    exports: [
        TabSwitchComponent
    ]
})
export class BgTabSwitchModule {
}
