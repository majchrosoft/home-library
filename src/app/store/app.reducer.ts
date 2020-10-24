import { itemReducer, ItemState } from '../item/store/item.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/auth-reducer';

export interface AppState {
  auth: AuthState,
  item: ItemState,
  bookcase: BookcaseS
}


export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  item: itemReducer,
  bookcase:
}
