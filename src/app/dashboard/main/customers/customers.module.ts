import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomersRoutingModule } from './customers-routes.module';

import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DashboardModule } from '../dashboard.module';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckoutComponent } from './checkout/checkout.component';
// import { BuildingsRoutingModule } from './building-routes.module';




@NgModule({
  declarations: [
    NewCustomerComponent,
    ListCustomersComponent,
    EditCustomerComponent,
    CheckinComponent,
    CheckoutComponent

  ],
  exports: [

  ],
  imports: [
    SharedModule,
    MatSharedModule,
    CommonModule,
    DashboardModule,
    AppRoutesModule,
    CustomersRoutingModule
    // BuildingsRoutingModule
  ]
})

export class CustomersModule {}
