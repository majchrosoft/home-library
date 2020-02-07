import { User } from '../user-model';
import {
  AuthActions,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_SUCCESS,
  CLEAR_ERROR,
  LOGIN_START,
  LOGOUT,
  SIGNUP_START
} from './auth-actions';

export interface State {
  user: User | null,
  authError: string | null,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

const loginOrSignUpStartReducer = (state: State, action: AuthActions): State => {
  return {
    ...state,
    authError: null,
    loading: true
  }
};

const defaultReducer = (state: State, action: AuthActions): State => {
  return {
    ...state
  }
};

const authenticateSuccessReducer = (state: State, action: AuthActions): State => {
  const user: User = new User(
    action.payload.email,
    action.payload.userId,
    action.payload.token,
    action.payload.expirationDate,
  );
  return {
    ...state,
    authError: null,
    user: user,
    loading: false
  }
}

const actions = new Map([

  [LOGIN_START, loginOrSignUpStartReducer],
  [SIGNUP_START, loginOrSignUpStartReducer],
  [AUTHENTICATE_SUCCESS, authenticateSuccessReducer],
  [AUTHENTICATE_FAIL, (state: State, action: AuthActions): State => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }],
  [CLEAR_ERROR, (state: State, action: AuthActions): State => {
    return {
      ...state,
      authError: null,
    }
  }],
  [LOGOUT, (state: State, action: AuthActions): State => {
    return {
      ...state,
      user: null
    }
  }],
  ['default', defaultReducer],
])


export function authReducer(
  state: State = initialState,
  action: AuthActions
) {

}
