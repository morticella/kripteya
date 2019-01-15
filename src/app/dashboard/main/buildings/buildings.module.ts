import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingsComponent } from './buildings.component';
import { NewBuildingComponent } from './new-building/new-building.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildingsRoutingModule } from './building-routes.module';




@NgModule({
  declarations: [
    BuildingsComponent,
    NewBuildingComponent,
    ListBuildingComponent,
    EditBuildingComponent,

  ],
  exports: [

  ],
  imports: [
    SharedModule,
    MatSharedModule,
    CommonModule,
    AppRoutesModule,
    BuildingsRoutingModule
  ]
})

export class BuildingsModule {}
