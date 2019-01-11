import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/signup/store/signup.reducers';
import * as fromAuth from '../auth/signup/store/signup.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authState$: Observable<AuthState>;
  authState: any;
  brand: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
    ) { }

  ngOnInit() {
    this.brand = 'Kripteya';

    this.authState$ = this.store.select('auth');
    this.authState = this.authState$;
    // // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService.getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   });
  }

  ngOnDestroy() {
    // this.authListenerSubs.unsubscribe();
  }
  onLogout() {
    this.store.dispatch(new fromAuth.LogoutAuthSuccess(true));
    // this.authService.logout();
    // this.userIsAuthenticated = false;
  }
}
