//import { Action } from '@ngrx/store';

import { CommonAction } from '../../shared/store/common-action';
import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export class AuthenticateSuccessPayload {
  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
  redirect: boolean;
}

export class LoginOrSignUpStartPayload {
  email: string;
  password: string
}


export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(
    public payload: LoginOrSignUpStartPayload
  ) {
  }
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: AuthenticateSuccessPayload
  ) {
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(
    public payload: string
  ) {
  }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: LoginOrSignUpStartPayload
  ) {
  }
}

export class ClearError extends CommonAction {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin extends CommonAction {
  readonly type = AUTO_LOGIN;
}

export class Logout extends CommonAction {
  readonly type = LOGOUT;
}

export type AuthActions =
  | LoginStart
  | AuthenticateSuccess
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin
  | Logout
