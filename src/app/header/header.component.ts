import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from '../auth/signup/store/signup.reducers';
import * as fromAuth from '../auth/signup/store/signup.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState$: Observable<AuthState>;
  authState: any;
  brand: string;
  now: Date = new Date();
  expiresIn: Date  = new Date(localStorage.getItem('expiresIn'));
  timeDiff = Math.abs(this.expiresIn.getTime() - this.now.getTime());
  logout = Math.ceil(this.timeDiff / (1000));
  // countdownLogout: string | number;

  constructor(
    private router: Router,
    private store: Store<AuthState>
    ) {}

  ngOnInit() {

    this.brand = 'Kripteya';
    this.authState$ = this.store.select('auth');
    this.authState = this.authState$;

    console.log('logout' , this.logout);
     setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('stateBuildings');
      this.router.navigate(['/']);
     }, this.logout * 1000);

  }

  onLogout() {
    this.store.dispatch(new fromAuth.LogoutAuthSuccess());
  }
}
