import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { MatSharedModule } from './shared/matShared.module';
import { AppRoutesModule } from './app.routes.module';
import { BuildingsModule } from './dashboard/main/buildings/buildings.module';
import { DashboardModule } from './dashboard/main/dashboard.module';
import { SignupComponent } from './auth/signup/signup.component';
import { StorageDataService } from './shared/storage-data.service';

import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './service/auth-interceptor';

import { BuildingsListReducers } from './dashboard/main/buildings/store/building-list.reducer';
import { BuildingEffects } from './dashboard/main/buildings/store/buiding-list.effects';
// import { metaReducers } from './dashboard/main/buildings/store/building-list.reducer';

import { NewRoomComponent } from './dashboard/main/buildings/new-room/new-room.component';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    NewRoomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    DashboardModule,
    BuildingsModule,
    HttpClientModule,
    MatSharedModule,
    FontAwesomeModule,


    // StoreModule.forRoot({statusList: BuildingsListReducers}),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],

    EffectsModule.forRoot([BuildingEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    AuthService,
    StorageDataService,
    Store,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
