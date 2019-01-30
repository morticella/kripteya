import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { NewPaymentComponent } from './new-payment/new-payment.component';
// import { ListPaymentsComponent } from './list-payments/list-payments.component';
// import { EditPaymentComponent } from './edit-payment/edit-payment.component';

import { AuthGuard } from 'src/app/shared/auth.guard';
import { NewPaymentComponent } from './new-payment/new-payment.component';
// import { ListPaymentsComponent } from './list-payments/list-payments.component';

const paymentsRoutes: Routes = [
  { path: 'dashboard/new-payment/:idCustomer' , component: NewPaymentComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/building-payments/:idBuilding' , component: ListPaymentsComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/new-payment/:idBuilding' , component: NewPaymentComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/edit-payment/:idPayment' , component: EditPaymentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(paymentsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
   ]
})
export class PaymentsRoutingModule {}
