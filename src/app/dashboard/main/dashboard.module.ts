import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingsModule } from './buildings/buildings.module';

import { MainComponent } from './main.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportsComponent } from './reports/reports.component';

import { MatSharedModule } from '../../shared/matShared.module';
import { AppRoutesModule } from '../../app.routes.module';


@NgModule({
  declarations: [
    MainComponent,
    CustomersComponent,
    PaymentsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    BuildingsModule,
    MatSharedModule,
    AppRoutesModule
  ],
  exports: [
    MainComponent,
  ]
})
export class DashboardModule {}

