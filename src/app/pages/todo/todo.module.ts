import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Todo } from './todo';
import { PopoverPage } from '../about-popover/about-popover';
import { TodoPageRoutingModule } from './todo-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TodoPageRoutingModule
    ],
    declarations: [Todo],
    bootstrap: [Todo]
})
export class TodoModule {}
