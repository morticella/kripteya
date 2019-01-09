import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Entities } from './entities.pipe';



@NgModule({
  declarations: [
    Entities
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Entities
  ],

})

export class SharedModule { }
