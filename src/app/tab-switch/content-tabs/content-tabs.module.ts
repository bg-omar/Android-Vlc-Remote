import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentTabsComponent} from './content-tabs.component';
import {BgIconModule} from '../../icon/icon.module';


@NgModule({
    declarations: [ContentTabsComponent],
    imports: [
        CommonModule,
        BgIconModule
    ],
    exports: [
        ContentTabsComponent
    ]
})
export class BgContentTabsModule {
}
