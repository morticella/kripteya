import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
// import { AuthState } from '../auth/signup/store/signup.reducers';
import { AppState } from '../reducers';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {}
    isAuth: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const CheckAuth = this.store.select(authState => authState.auth.authenticated).subscribe(
      authState => this.isAuth = authState
    );
    if (!this.isAuth) {
      this.router.navigate(['/']);
    }
    return this.isAuth;
  }
}
