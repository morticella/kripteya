import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { MAT_DATE_LOCALE} from '@angular/material/core';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SignupComponent } from './component/signup/signup.component';
import { MainComponent } from './dashboard/main/main.component';

import { BuildingsComponent } from './dashboard/main/buildings/buildings.component';
import { NewBuildingComponent } from './dashboard/main/buildings//new-building/new-building.component';
import { ListBuildingComponent } from './dashboard/main/buildings//list-building/list-building.component';
import { EditBuildingComponent } from './dashboard/main/buildings//edit-building/edit-building.component';

import { NewRoomComponent } from './dashboard/main/buildings/new-room/new-room.component';




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { AuthService } from './service/auth.service';
import { StorageDataService } from './shared/storage-data.service';
import { AuthInterceptor } from './service/auth-interceptor';
import { CustomersComponent } from './dashboard/main/customers/customers.component';
import { PaymentsComponent } from './dashboard/main/payments/payments.component';
import { ReportsComponent } from './dashboard/main/reports/reports.component';


import { BuildingsListReducers } from './dashboard/main/buildings/store/building-list.reducer';
import { BuildingEffects } from './dashboard/main/buildings/store/buiding-list.effects';
// import { metaReducers } from './dashboard/main/buildings/store/building-list.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppEffects } from './app.effects';
import { MatSharedModule } from './shared/matShared.module';
import { AppRoutesModule } from './app.routes.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersComponent,
    PaymentsComponent,
    ReportsComponent,
    BuildingsComponent,
    NewBuildingComponent,
    ListBuildingComponent,
    EditBuildingComponent,
    SignupComponent,
    MainComponent,
    NewRoomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatSharedModule,
    FontAwesomeModule,
    // StoreModule.forRoot(,{ metaReducers }),
    StoreModule.forRoot({statusList: BuildingsListReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([BuildingEffects, AppEffects]),
  ],
  providers: [

    AuthService,
    StorageDataService,
    Store,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
