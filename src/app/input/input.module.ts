import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {BgIconModule} from '../icon/icon.module';
import {FormsModule} from '@angular/forms';
import {BgDirectivesModule} from '../directive/directives.module';
import {BgDropdownListModule} from '../dropdown-list/dropdown-list.module';

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        BgIconModule,
        FormsModule,
        BgDirectivesModule,
        BgDropdownListModule
    ],
    exports: [
        InputComponent
    ]
})
export class BgInputModule {
}
