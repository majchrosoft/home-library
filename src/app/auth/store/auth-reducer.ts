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

export interface AuthState {
  user: User | null,
  authError: string | null,
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}

const loginOrSignUpStartReducer = (state: AuthState, action: AuthActions): AuthState => {
  return {
    ...state,
    authError: null,
    loading: true
  }
};

const defaultReducer = (state: AuthState, action: AuthActions): AuthState => {
  return {
    ...state
  }
};

const authenticateSuccessReducer = (state: AuthState, action: AuthActions): AuthState => {
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
  [AUTHENTICATE_FAIL, (state: AuthState, action: AuthActions): AuthState => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }],
  [CLEAR_ERROR, (state: AuthState, action: AuthActions): AuthState => {
    return {
      ...state,
      authError: null,
    }
  }],
  [LOGOUT, (state: AuthState, action: AuthActions): AuthState => {
    return {
      ...state,
      user: null
    }
  }],
  ['default', defaultReducer],
])


export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
) {
  return actions.get(action.type)(state, action);
}
