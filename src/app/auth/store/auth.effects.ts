import { User } from '../user-model';
import { AuthenticateFail, AuthenticateSuccess, SIGNUP_START, SignupStart } from './auth-actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date((new Date()).getTime() + expiresIn * 1000);
  const user = new User(
    email,
    userId,
    token,
    expirationDate
  );

  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
}

const enum errors {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWOR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

const knownErrorsHasMap = new Map([
  [errors.EMAIL_EXISTS, 'email exists'],
  [errors.EMAIL_NOT_FOUND, 'email not found'],
  [errors.INVALID_PASSWORD, 'invalid password'],
  [errors.UNKNOWN, 'unkonwn error'],
]);

const handleError = (errorRes: any) => {
  let errorMessage = 'Error occured. Retry Your action again later.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthenticateFail(errorMessage));
  }

  return knownErrorsHasMap.has(errorRes.error.error) ? knownErrorsHasMap.get(errorRes.error.error) : knownErrorsHasMap.get(errors.UNKNOWN);

}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    // private authService: AuthServic
  ) {
  }

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap(
      (signupAction: SignupStart) => {
        return this.http.post<AuthResponseData>(

        )
      })
  )
}
