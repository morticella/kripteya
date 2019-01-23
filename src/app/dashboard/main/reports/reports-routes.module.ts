import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { NewReportComponent } from './new-report/new-report.component';
// import { ListReportsComponent } from './list-reports/list-reports.component';
// import { EditReportComponent } from './edit-report/edit-report.component';

import { AuthGuard } from 'src/app/shared/auth.guard';
import { ListReportsComponent } from './list-reports/list-reports.component';

const reportsRoutes: Routes = [
  { path: 'dashboard/reports' , component: ListReportsComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/building-reports/:idBuilding' , component: ListReportsComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/new-report/:idBuilding' , component: NewReportComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard/edit-report/:idReport' , component: EditReportComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(reportsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
   ]
})
export class ReportsRoutingModule {}
