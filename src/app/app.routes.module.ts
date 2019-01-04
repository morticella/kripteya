import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './service/auth.guard';

// SignUp/Signin Home
import { SignupComponent } from './component/signup/signup.component';

// Dashboard
import { MainComponent } from './dashboard/main/main.component';

// Buildings CRUD
import { NewBuildingComponent } from './dashboard/main/buildings//new-building/new-building.component';
import { ListBuildingComponent } from './dashboard/main/buildings//list-building/list-building.component';
import { EditBuildingComponent } from './dashboard/main/buildings//edit-building/edit-building.component';

// Rooms CRUD

import { NewRoomComponent } from './dashboard/main/buildings/new-room/new-room.component';


const appRoutes: Routes = [
  { path: '' , component: SignupComponent },
  { path: 'dashboard' , component: MainComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/buildings' , component: ListBuildingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/add-building' , component: NewBuildingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/edit-building/:id' , component: EditBuildingComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/new-room/:nameBuilding' , component: NewRoomComponent, canActivate: [AuthGuard] },
];

@NgModule({
 imports: [
  RouterModule.forRoot(appRoutes),
 ],
 exports: [
  RouterModule
 ],
 providers: [
  AuthGuard,
 ]
})

export class AppRoutesModule {}
