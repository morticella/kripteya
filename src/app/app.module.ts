import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MatSharedModule } from './shared/matShared.module';
import { AppRoutesModule } from './app.routes.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/main/dashboard.module';
import { BuildingsModule } from './dashboard/main/buildings/buildings.module';
import { RoomsModule } from './dashboard/main/rooms/rooms.module';
import { StorageDataService } from './shared/storage-data.service';

import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './service/auth-interceptor';

import { BuildingEffects } from './dashboard/main/buildings/store/buiding-list.effects';
import { RoomEffects } from './dashboard/main/rooms/store/rooms.effects';
import { AuthEffects } from './auth/signup/store/signup.effects';

import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    DashboardModule,
    BuildingsModule,
    RoomsModule,
    SharedModule,
    MatSharedModule,
    AppRoutesModule,
    EffectsModule.forRoot([BuildingEffects, RoomEffects, AuthEffects]),
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
