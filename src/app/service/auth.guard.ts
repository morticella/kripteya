import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../reducers';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>) {}

    isAuth: boolean;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this.store.select(authState => authState.auth.authenticated).subscribe(
      authState => this.isAuth = authState
    );
    if (localStorage.getItem('token')) {
      this.isAuth = true;
    }
    if (!this.isAuth) {
      this.router.navigate(['/']);
    }
    return this.isAuth;
  }
}
