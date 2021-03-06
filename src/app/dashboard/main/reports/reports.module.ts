import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReportsRoutingModule } from './reports-routes.module';
import { DashboardModule } from '../dashboard.module';
import { ListReportsComponent } from './list-reports/list-reports.component';

@NgModule({
  declarations: [
    ListReportsComponent,
    ListReportsComponent
  ],
  imports: [
    SharedModule,
    MatSharedModule,
    CommonModule,
    DashboardModule,
    AppRoutesModule,
    ReportsRoutingModule
  ]
})

export class ReportsModule {}
