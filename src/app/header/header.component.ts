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

  constructor(
    private router: Router,
    private store: Store<AuthState>
    ) {}

  ngOnInit() {
    this.brand = 'Kripteya';
    this.authState$ = this.store.select('auth');
    this.authState = this.authState$;
  }

  onLogout() {
    this.store.dispatch(new fromAuth.LogoutAuthSuccess(true));
    this.router.navigate(['/']);
  }
}
