import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

// SignUp/Signin Home
import { SignupComponent } from './auth/signup/signup.component';

// Dashboard
// import { MainComponent } from './dashboard/main/main.component';
import { DashboardComponent } from './dashboard/main/dashboard.component';

// Buildings CRUD


// Rooms CRUD


// Customers CRUD



const appRoutes: Routes = [
  { path: '' , component: SignupComponent },
  { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard] },

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
