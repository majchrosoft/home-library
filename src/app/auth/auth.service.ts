import { RequestData } from '../../core/http/RequestData';
import { environment } from '../../environments/environment';
import { AbstractRequestData } from '../../core/http/AbstractRequestData';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Logout } from './store/auth-actions';

export interface AuthRequestBody {
  email: string, //	The email for the user to create.
  password: string, //	The password for the user to create.
  returnSecureToken: boolean, //	Whether or not to return an ID and refresh token. Should always be true.
}

export interface AuthSignUpResponseData {
  idToken: string //	A Firebase Auth ID token for the newly created user.
  email: string //	The email for the newly created user.
  refreshToken: string //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string //	The number of seconds in which the ID token expires.
  localId: string //	The uid of the newly created user.
}

export interface AuthSignInResponseData {
  idToken: string//	A Firebase Auth ID token for the authenticated user.
  email: string//	The email for the authenticated user.
  refreshToken: string//	A Firebase Auth refresh token for the authenticated user.
  expiresIn: string//	The number of seconds in which the ID token expires.
  localId: string//	The uid of the authenticated user.
  registered: boolean//	Whether the email is for an existing account.
}

export class AuthSignUpRequestData extends AbstractRequestData implements RequestData {
  metaUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
  body: AuthRequestBody;
  protected paramNames: string[] = ['[API_KEY]'];
  protected params: string[] = [environment.firebaseApiKey];

  constructor(body: AuthRequestBody) {
    super();
    this.body = body;
  }

}

export class AuthSignInRequestData extends AbstractRequestData implements RequestData {
  metaUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
  body: AuthRequestBody;
  protected paramNames: string[] = ['[API_KEY]'];
  protected params: string[] = [environment.firebaseApiKey];

  constructor(body: AuthRequestBody) {
    super();
    this.body = body;
  }

}

const UserLocalStorageDataKey = 'userData';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<AppState>
  ) {
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new Logout());
    }, expirationDuration * 1000);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
