import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Todos } from './todos';
import { PopoverPage } from '../about-popover/about-popover';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      TodosRoutingModule
    ],
    declarations: [Todos],
    bootstrap: [Todos]
})
export class TodosModule {}
