import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import * as fromAuth from './store/signup.reducers';
import * as authActions from './store/signup.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usersSignup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    checkPassword: new FormControl( null, [Validators.required, this.checkPassword.bind(this)] ),
  });

  usersLogin = new FormGroup({
    emailLogin: new FormControl(null, [Validators.required, Validators.email]),
    passwordLogin: new FormControl(null, Validators.required),
  });

  setup: boolean;
  level: string;
  users: any;
  signup: boolean;
  authState$: Observable<fromAuth.AuthState>;
  authState: any;

  constructor(
    private store: Store<fromAuth.AuthState>,
    ) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
    this.authState = this.authState$;
    this.store.dispatch(new authActions.CheckSetUp());
  }

  onSignUp(data: FormGroup) {
    this.store.dispatch(new authActions.SignUpAuth(data));
  }

  onLogin(data: FormGroup) {
    this.store.dispatch(new authActions.LoginAuth(data));
  }

  checkPassword (control: FormControl): {[s: string]: boolean} {
    if (control.value) {
      return null;
    }
     return {'Passowrd not equals': true};
  }
}
