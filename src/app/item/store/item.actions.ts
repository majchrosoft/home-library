import { Action } from '@ngrx/store';
import { Item } from '../item.model';

export const ADD_ITEM = '[item] Add';
export const EDIT_ITEM = '[item] Edit';
export const DELETE_ITEM = '[item] Delete';
export const SET_ITEM_LIST = '[item] Set List';
export const FETCH_ITEM_LIST = '[item] Fetch List';
export const STORE_ITEM_LIST = '[item] Store List';

export class AddItem implements Action {
  readonly type = ADD_ITEM;

  constructor(public payload: Item) {
  }
}

export class EditItem implements Action {
  readonly type = EDIT_ITEM;

  constructor(public payload: { id: string; newItem: Item }) {
  }
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;

  constructor(public payload: string) {
  }
}

export class FetchItemList implements Action {
  readonly type = FETCH_ITEM_LIST;
}

export class SetItemList implements Action {
  readonly type = SET_ITEM_LIST;

  constructor(public payload: Item[]) {
  }
}

export class StoreItemList implements Action {
  readonly type = STORE_ITEM_LIST;
}

export type ItemActions =
  | AddItem
  | EditItem
  | DeleteItem
  | StoreItemList
  | FetchItemList
  | SetItemList
  ;
