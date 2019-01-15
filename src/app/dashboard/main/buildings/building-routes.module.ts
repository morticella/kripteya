import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBuildingComponent } from './new-building/new-building.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';

import { AuthGuard } from 'src/app/shared/auth.guard';

const buildingsRoutes: Routes = [
  { path: 'dashboard/buildings' , component: ListBuildingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/add-building' , component: NewBuildingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/edit-building/:id' , component: EditBuildingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(buildingsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
   ]
})
export class BuildingsRoutingModule {}
