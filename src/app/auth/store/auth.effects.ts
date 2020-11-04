import { User } from '../user-model';
import {
  AUTHENTICATE_SUCCESS,
  AuthenticateSuccess,
  AUTO_LOGIN,
  LOGIN_START,
  LoginStart,
  LOGOUT,
  SIGNUP_START,
  SignupStart
} from './auth-actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  AuthService,
  AuthSignInRequestData,
  AuthSignInResponseData,
  AuthSignUpRequestData,
  AuthSignUpResponseData
} from '../auth.service';
import { handleAuthentication } from './auth-effects/handle-authentication';
import { handleError } from './auth-effects/handle-error';
import { userDataStorageService } from '../../../infrastructure/persistance/local-storage/local-storage-user-data-repository';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap(
      (signupAction: SignupStart) => {

        let signUpRequestData = new AuthSignUpRequestData({
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        );

        return this.http.post<AuthResponseData>(
          signUpRequestData.url,
          signUpRequestData.body
        ).pipe(
          tap((responseData: AuthSignUpResponseData) => {
            this.authService.setLogoutTimer(+responseData.expiresIn);
          }),
          map((responseData: AuthResponseData) => {
            return handleAuthentication(
              +responseData.expiresIn,
              responseData.email,
              responseData.localId,
              responseData.idToken
            );
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
      })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authAction: LoginStart) => {

      let authSignInRequestData = new AuthSignInRequestData({
        email: authAction.payload.email,
        password: authAction.payload.password,
        returnSecureToken: true
      });

      return this.http.post<AuthSignInResponseData>(
        authSignInRequestData.url,
        authSignInRequestData.body
      )
        .pipe(
          tap((responseData: AuthSignInResponseData) => {
            this.authService.setLogoutTimer(+responseData.expiresIn);
          }),
          map((responseData: AuthSignInResponseData) => {
            return handleAuthentication(
              +responseData.expiresIn,
              responseData.email,
              responseData.localId,
              responseData.idToken
            )
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    }),
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AUTHENTICATE_SUCCESS),
    tap((authActionSuccess: AuthenticateSuccess) => {
      if (authActionSuccess.payload.redirect) {
        this.router.navigate(['/items'])
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AUTO_LOGIN),
    map(() => {
      const user: User | null = userDataStorageService.get()

      if (!user) {
        return { type: 'DUMMY' };
      }

      if (user.token) {

        this.authService.setLogoutTimer(user.expirationDuration);

        return new AuthenticateSuccess({
          email: user.email,
          userId: user.id,
          token: user.token,
          expirationDate: user.expirationDate,
          redirect: false
        });
      }
    })
  )

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      userDataStorageService.removeUser();
      this.router.navigate(['/auth']);
    })
  )


}
