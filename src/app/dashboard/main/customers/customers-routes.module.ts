import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/auth.guard';

import { ListCustomersComponent } from './list-customers/list-customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const customersRoutes: Routes = [
  { path: 'dashboard/room-customers' , component: ListCustomersComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/room-customers/:idRoom' , component: ListCustomersComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/new-customer/:idRoom/:idBuilding' , component: NewCustomerComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/edit-customer/:idCustomer' , component: EditCustomerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(customersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
   ]
})
export class CustomersRoutingModule {}
