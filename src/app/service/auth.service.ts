import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';


import { Auth } from './auth.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/signup/store/signup.reducers';
import * as authAction from '../auth/signup/store/signup.actions';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AuthState> ) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private setExpirationDate(duration: number) {
    // console.log('Setting time : ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  signupSuperAdmin(userData: string, passwordData: string, levelData: string) {

    const authData: Auth = {
      user: userData,
      password: passwordData,
      level: levelData
    };

    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/signup', authData)
      .subscribe(
      res => {
        this.store.dispatch(new authAction.SignUpAuthSuccess());
        this.router.navigate(['/dashboard']);
      },
        () => this.store.dispatch(new authAction.SignUpAuthFailed(true)),

    );
  }

  login(userLogin: string, passwordLogin: string, levelLogin: string) {

      const authData: Auth = {
        user: userLogin,
        password: passwordLogin,
        level: levelLogin
      };

      this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/login', authData)
        .subscribe(response => {
         //  console.log(response);
          const token = response.token;

          this.token = token;
          if (token) {
            this.store.dispatch(new authAction.LoginAuthSuccess(''));
            const expiresInDuration = response.expiresIn;
            this.setExpirationDate(expiresInDuration);
            // this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            // this.saveAuthData(token, expirationDate);
            this.store.dispatch(new authAction.SetToken(token));
            this.store.dispatch(new authAction.SetTokenExpiration(expirationDate));
            this.router.navigate(['/dashboard']);
          }
        },
        () => this.store.dispatch(new authAction.LoginAuthFailed(true)));

    }
  logout() {
      // this.token = null;
      this.authStatusListener.next(false);
      this.router.navigate(['/']);
      // this.clearAuthData();
      // clearTimeout(this.tokenTimer);
      this.store.dispatch(new authAction.LogoutAuth());
      this.store.dispatch(new authAction.UnSetToken(null));
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setExpirationDate(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }



  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
}
