import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { UsersLevel } from 'src/app/shared/user-level/user-level.module';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;

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

  constructor(
    private storageData: StorageDataService,
    private authService: AuthService
    ) { }

  ngOnInit() {

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

  onSignUp() {
    this.isLoading = true;
    const user = this.usersSignup.value.email;
    const password = this.usersSignup.value.password;
    const passHash =  window.btoa(password);
    const level = this.level;
    this.authService.signupSuperAdmin(user, passHash, level);
    // this.router.navigateByUrl('/main');
  }

  onLogin() {
    // this.isLoading = true;
    const email = this.usersLogin.value.emailLogin;
    const password = this.usersLogin.value.passwordLogin;
    const level = null;
    // this.router.navigateByUrl('/main');
    const passHash =  window.btoa(password);
    this.authService.login(email, passHash , level);
    // this.isLoading = false;
  }
  checkPassword (control: FormControl): {[s: string]: boolean} {
    if (control.value) {
      return null;
    }
     return {'Passowrd not equals': true};
  }
  ngOnDestroy() {
    this.isLoading = true;
    this.usersUpdated.unsubscribe();
  }
}
