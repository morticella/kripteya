import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardModule } from '../dashboard.module';
import { PaymentsRoutingModule } from './payments-routes.module';

import { NewPaymentComponent } from './new-payment/new-payment.component';

@NgModule({
  declarations: [

    NewPaymentComponent
  ],
  imports: [
    SharedModule,
    MatSharedModule,
    CommonModule,
    DashboardModule,
    AppRoutesModule,
    PaymentsRoutingModule
  ]
})

export class PaymentsModule {}
