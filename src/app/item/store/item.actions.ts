import { Action } from '@ngrx/store';
import { UserItem } from '../user-item.model';

export const ADD_USER_ITEM = '[item] Add';
export const EDIT_USER_ITEM = '[item] Edit';
export const DELETE_USER_ITEM = '[item] Delete';
export const SET_USER_ITEM_LIST = '[item] Set List';
export const FETCH_USER_ITEM_LIST = '[item] Fetch List';
export const STORE_ITEM_LIST = '[item] Store List';
export const ITEM_ACTION_BORROW = '[item] Borrow';
export const ITEM_ACTION_GIVE_BACK_BORROWED = '[item] Give Back Borrowed';

export class AddUserItem implements Action {
  readonly type = ADD_USER_ITEM;

  constructor(public payload: UserItem) {
  }
}

export class EditUserItem implements Action {
  readonly type = EDIT_USER_ITEM;

  constructor(public payload: UserItem) {
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

export class ItemActionBorrow implements Action {
  readonly type = ITEM_ACTION_BORROW;

  constructor(public payload: UserItem) {
  }
}

export class ItemActionGiveBackBorrowed implements Action {
  readonly type = ITEM_ACTION_GIVE_BACK_BORROWED;

  constructor(public payload: UserItem) {
  }
}

export type ItemActions =
  | AddUserItem
  | EditUserItem
  | DeleteItem
  | StoreItemList
  | FetchUserItemList
  | SetUserItemList
  | ItemActionBorrow
  | ItemActionGiveBackBorrowed
  ;
