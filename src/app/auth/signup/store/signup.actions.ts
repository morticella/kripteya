import {Action} from '@ngrx/store';

// import {Room} from '../../../../shared/models/room.model';

export enum AuthActionTypes {
  CheckSetUp = '[Check if SetUp] SetUp Request',
  CheckSetUpSuccess = '[CheckSetUp API] CheckSetUp Success',
  CheckSetUpFailed = '[CheckSetUp API] CheckSetUp Failed',
  LoginAuth = '[Trying Login] Login Auth Request',
  LoginAuthSuccess = '[Login API] Login Auth Success',
  LoginAuthFailed = '[Login API] Login Auth Failed',
  SignUpAuth = '[Trying SignUp] SignUp Auth Request',
  SignUpAuthSuccess = '[SignUp API] SignUp Auth Success',
  SignUpAuthFailed = '[SignUp API] SignUp Auth Failed',
  LogoutAuthSuccess= '[Logout] Logout done',
}

export class CheckSetUp implements Action {
  readonly type = AuthActionTypes.CheckSetUp;
}
export class CheckSetUpSuccess implements Action {
  readonly type = AuthActionTypes.CheckSetUpSuccess;
  constructor(public payload: boolean) {}
}
export class CheckSetUpFailed implements Action {
  readonly type = AuthActionTypes.CheckSetUpFailed;
  constructor(public payload: boolean) {}
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
export class LogoutAuthSuccess implements Action {
  readonly type = AuthActionTypes.LogoutAuthSuccess;
  constructor(public payload: any) {}
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
              LogoutAuthSuccess|
              CheckSetUp |
              CheckSetUpFailed |
              CheckSetUpSuccess;
