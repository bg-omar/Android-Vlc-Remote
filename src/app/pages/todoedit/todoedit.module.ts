import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TodoEdit } from './todoedit.component';
import { PopoverPage } from '../about-popover/about-popover';
import { TodoEditRoutingModule } from './todoedit-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      TodoEditRoutingModule
    ],
    declarations: [TodoEdit],
    bootstrap: [TodoEdit]
})
export class TodoeditModule {}
