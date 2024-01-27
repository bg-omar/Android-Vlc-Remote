import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeComponent} from './badge.component';
import {BgIconModule} from '../icon/icon.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [BadgeComponent],
    imports: [
        CommonModule,
        BgIconModule,
        FormsModule
    ],
    exports: [
        BadgeComponent
    ]
})
export class BgBadgeModule { }
