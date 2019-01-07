import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BuildingsComponent } from './buildings.component';
import { NewBuildingComponent } from './new-building/new-building.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';
import { Entities } from 'src/app/shared/entities.pipe';



@NgModule({
  declarations: [
    BuildingsComponent,
    NewBuildingComponent,
    ListBuildingComponent,
    EditBuildingComponent,
    Entities,
  ],
  exports: [
    Entities
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSharedModule,
    CommonModule,
    AppRoutesModule,

  ]
})

export class BuildingsModule {}
