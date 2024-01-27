import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownListComponent} from './dropdown-list.component';
import {BgIconModule} from '../icon/icon.module';


@NgModule({
    declarations: [
        DropdownListComponent
    ],
    imports: [
        CommonModule,
        BgIconModule,
    ],
    exports: [
        DropdownListComponent
    ]
})
export class BgDropdownListModule {
}
