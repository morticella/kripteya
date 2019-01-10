import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    SharedModule,
    MatSharedModule,
    CommonModule,
    AppRoutesModule,
    FormsModule
  ]
})

export class AuthModule {}
