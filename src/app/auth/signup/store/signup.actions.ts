import {Action} from '@ngrx/store';

// import {Room} from '../../../../shared/models/room.model';

export enum AuthActionTypes {

  LoginAuth = '[Trying Login] Login Auth Request',
  LoginAuthSuccess = '[Login API] Login Auth Success',
  LoginAuthFailed = '[Login API] Login Auth Failed',
  SignUpAuth = '[Trying SignUp] SignUp Auth Request',
  SignUpAuthSuccess = '[SignUp API] SignUp Auth Success',
  SignUpAuthFailed = '[SignUp API] SignUp Auth Failed',
  LogoutAuth = '[Trying Logout] Logout Auth Request',
  LogoutAuthSuccess = '[Logout API] Logout Auth Success',
  LogoutAuthFailed = '[Logout API] Logout Auth Failed',
}



export class LoginAuth implements Action {
  readonly type = AuthActionTypes.LoginAuth;
  constructor(public payload: any) {}
}

export class LoginAuthSuccess implements Action {
  readonly type = AuthActionTypes.LoginAuthSuccess;
  constructor(public payload: any) {}
}
export class LoginAuthFailed implements Action {
  readonly type = AuthActionTypes.LoginAuthFailed;
  constructor(public error: boolean) {}
}

export class LogoutAuth implements Action {
  readonly type = AuthActionTypes.LogoutAuth;
  // constructor(public payload: any) {}
}

export class LogoutAuthSuccess implements Action {
  readonly type = AuthActionTypes.LogoutAuthSuccess;
  constructor(public payload: any) {}
}
export class LogoutAuthFailed implements Action {
  readonly type = AuthActionTypes.LogoutAuthFailed;
  constructor(public error: boolean) {}
}

export class SignUpAuth implements Action {
  readonly type = AuthActionTypes.SignUpAuth;
  constructor(public payload: any) {}
}

export class SignUpAuthSuccess implements Action {
  readonly type = AuthActionTypes.SignUpAuthSuccess;
  constructor(public payload: any) {}
}
export class SignUpAuthFailed implements Action {
  readonly type = AuthActionTypes.SignUpAuthFailed;
  constructor(public error: boolean) {}
}





export type AuthListAction =
              LoginAuth |
              LoginAuthSuccess |
              LoginAuthFailed |
              SignUpAuth |
              SignUpAuthSuccess |
              SignUpAuthFailed |
              LogoutAuth |
              LogoutAuthSuccess |
              LogoutAuthFailed;
