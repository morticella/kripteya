import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { UsersLevel } from 'src/app/shared/user-level/user-level.module';


import * as fromAuth from './store/signup.reducers';
import * as authActions from './store/signup.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {



  usersSignup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    checkPassword: new FormControl( null, [Validators.required, this.checkPassword.bind(this)] ),
  });

  usersLogin = new FormGroup({
    emailLogin: new FormControl(null, [Validators.required, Validators.email]),
    passwordLogin: new FormControl(null, Validators.required),
  });

  private usersUpdated: Subscription;
  setup: boolean;
  level: string;
  users: any;
  signup: boolean;
  authState$: Observable<fromAuth.AuthState>;
  authState: any;

  constructor(
    private storageData: StorageDataService,
    private store: Store<fromAuth.AuthState>,
    ) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
    this.authState = this.authState$;


    this.users = this.storageData.loadUsers();
    this.usersUpdated = this.storageData.checkLoadedUsers()
    .subscribe((usersLevel: UsersLevel[]) => {
      this.users = usersLevel;
      this.level = 'SuperAdmin';
      if (this.users[0]) {
        this.setup = false;
        this.level = 'Normal';
      } else {
        this.setup = true;
      }
    });
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
  ngOnDestroy() {

    this.usersUpdated.unsubscribe();
  }
}
