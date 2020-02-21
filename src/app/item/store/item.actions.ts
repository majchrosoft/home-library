import { Action } from '@ngrx/store';
import { UserItem } from '../user-item.model';
import { Item } from '../item-vo';

export const ADD_USER_ITEM = '[item] Add';
export const EDIT_USER_ITEM = '[item] Edit';
export const DELETE_USER_ITEM = '[item] Delete';
export const SET_USER_ITEM_LIST = '[item] Set List';
export const FETCH_USER_ITEM_LIST = '[item] Fetch List';
export const STORE_ITEM_LIST = '[item] Store List';

export class AddEditUserItemPayload {
  item: Item;
  id: string | null;
}

export class AddUserItem implements Action {
  readonly type = ADD_USER_ITEM;

  constructor(public payload: AddEditUserItemPayload) {
  }
}

export class EditUserItem implements Action {
  readonly type = EDIT_USER_ITEM;

  constructor(public payload: AddEditUserItemPayload) {
  }
}

export class DeleteItem implements Action {
  readonly type = DELETE_USER_ITEM;

  constructor(public payload: string) {
  }
}

export class FetchUserItemList implements Action {
  readonly type = FETCH_USER_ITEM_LIST;
}

export class SetUserItemList implements Action {
  readonly type = SET_USER_ITEM_LIST;

  constructor(public payload: UserItem[]) {
  }
}

export class StoreItemList implements Action {
  readonly type = STORE_ITEM_LIST;
}

export type ItemActions =
  | AddUserItem
  | EditUserItem
  | DeleteItem
  | StoreItemList
  | FetchUserItemList
  | SetUserItemList
  ;
