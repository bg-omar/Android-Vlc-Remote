import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BgIconModule} from '../icon/icon.module';
import {BgDirectivesModule} from '../directive/directives.module';
import {ScrollNavComponent} from './scroll-nav.component';

@NgModule({
    declarations: [
        ScrollNavComponent
    ],
    exports: [
        ScrollNavComponent
    ],
    imports: [
        CommonModule,
        BgIconModule,
        BgDirectivesModule
    ]
})
export class BgScrollNavModule {
}
