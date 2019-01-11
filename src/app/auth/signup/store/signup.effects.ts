import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthActionTypes } from '../store/signup.actions';
import * as AuthActions from '../store/signup.actions';
import { Auth } from 'src/app/service/auth.model';
import { UsersLevel } from 'src/app/shared/user-level/user-level.module';


console.log('sono nelleffects ');

@Injectable()
export class AuthEffects {
  urlBackEnd = 'http://localhost:3000';
  error = 0;
  id: string;
  user: any;
  passHash: string;
  expiresIn: number;


   @Effect()
 Login$ = this.actions$
 .pipe(ofType<AuthActions.LoginAuth>(AuthActionTypes.LoginAuth), switchMap( (action: AuthActions.LoginAuth) => {
  const passHash =  window.btoa(action.payload.passwordLogin);
  const authData: Auth = {
    user: action.payload.emailLogin,
    password: passHash,
    level: null
  };

  return this.http.post<{token: string, expiresIn: number}>(this.urlBackEnd + '/api/login', authData).pipe(
    map(
      data => new AuthActions.LoginAuthSuccess(data)
    ),
    tap(
      () => this.router.navigate(['dashboard'])
    ),
    catchError(
      () => of(new AuthActions.LoginAuthFailed(true))
    ));
  }));

  @Effect()
  Signup$ = this.actions$
 .pipe(ofType<AuthActions.SignUpAuth>(AuthActionTypes.SignUpAuth), switchMap( (action: AuthActions.SignUpAuth) => {
  const passHash =  window.btoa(action.payload.password);
  const level = 'SuperAdmin';
  const authData: Auth = {
    user: action.payload.email,
    password: passHash,
    level: level
  };
  return this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/signup', authData).pipe(
    map(
      data => new AuthActions.SignUpAuthSuccess(data)
    ),
    tap(
      () => this.router.navigate(['dashboard'])
    ),
    catchError(
      () => of(new AuthActions.SignUpAuthFailed(true))
    ));
  }));
  @Effect()
  Setup$ = this.actions$
 .pipe(ofType<AuthActions.CheckSetUp>(AuthActionTypes.CheckSetUp), switchMap( () => {

  return this.http.get<UsersLevel>('http://localhost:3000/api/users').pipe(
    map(
      () => new AuthActions.CheckSetUpSuccess(false)
    ),
    catchError(
      () => of(new AuthActions.CheckSetUpFailed(true))
    ));
  }));
 constructor(
   private actions$: Actions,
   private http: HttpClient,
   // private store: Store<fromAuth.AuthState>,
   private router: Router) {}

}
