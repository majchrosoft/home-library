import { itemReducer, ItemState } from '../item/store/item.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  item: ItemState,
}


export const appReducer: ActionReducerMap<AppState> = {
  item: itemReducer,
}
