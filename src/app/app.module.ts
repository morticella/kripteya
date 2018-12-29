import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatRadioModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

const appRoutes: Routes = [
  { path: '' , component: SignupComponent },
  { path: 'dashboard' , component: MainComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/buildings' , component: ListBuildingComponent, canActivate: [AuthGuard] },

];

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './component/signup/signup.component';
import { MainComponent } from './dashboard/main/main.component';
import { AuthGuard } from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { StorageDataService } from './shared/storage-data.service';
import { AuthInterceptor } from './service/auth-interceptor';
import { BuildingsComponent } from './dashboard/main/buildings/buildings.component';
import { CustomersComponent } from './dashboard/main/customers/customers.component';
import { PaymentsComponent } from './dashboard/main/payments/payments.component';
import { ReportsComponent } from './dashboard/main/reports/reports.component';
import { NewBuildingComponent } from './dashboard/main/buildings/new-building/new-building.component';
import { ListBuildingComponent } from './dashboard/main/buildings/list-building/list-building.component';
import { EditBuildingComponent } from './dashboard/main/buildings/edit-building/edit-building.component';
import { NewRoomComponent } from './dashboard/main/buildings/new-room/new-room.component';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { DatepickerComponent } from './dashboard/main/date-format/datepicker/datepicker.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    MainComponent,
    BuildingsComponent,
    CustomersComponent,
    PaymentsComponent,
    ReportsComponent,
    NewBuildingComponent,
    ListBuildingComponent,
    EditBuildingComponent,
    NewRoomComponent,
    DatepickerComponent,



  ],
  exports: [

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule

  ],
  providers: [
    AuthGuard,
    AuthService,
    StorageDataService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
