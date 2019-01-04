import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BuildingsComponent } from './buildings.component';
import { NewBuildingComponent } from './new-building/new-building.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';


// import { MainComponent } from '../main.component';
// import { CustomersComponent } from '../customers/customers.component';
// import { PaymentsComponent } from '../payments/payments.component';
// import { ReportsComponent } from '../reports/reports.component';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';



@NgModule({
  declarations: [
    // MainComponent,
    // CustomersComponent,
    // PaymentsComponent,
    // ReportsComponent
    BuildingsComponent,
    NewBuildingComponent,
    ListBuildingComponent,
    EditBuildingComponent,
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
