import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BuildingsModule } from './buildings/buildings.module';

import { MainComponent } from './main.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard.component';

import { MatSharedModule } from '../../shared/matShared.module';
import { AppRoutesModule } from '../../app.routes.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    CustomersComponent,
    PaymentsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    // BuildingsModule,
    MatSharedModule,
    AppRoutesModule,
    SharedModule
  ],
  exports: [
    MainComponent,
  ]
})
export class DashboardModule {}
