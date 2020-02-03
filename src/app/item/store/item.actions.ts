import { Action } from '@ngrx/store';

export const ADD_ITEM_START = '[item] Start Add';
export const EDIT_ITEM_START = '[item] Start Edit';
export const DELETE_ITEM_START = '[item] Start Delete';
export const FETCH_ITEM_LIST = '[item] Fetch Item List';

export class AddItemStart implements Action {
  readonly type = ADD_ITEM_START;
}

export class EditItemStart implements Action {
  readonly type = EDIT_ITEM_START;
}

export class DeleteItemStart implements Action {
  readonly type = DELETE_ITEM_START;
}

export class FetchItemList implements Action {
  readonly type = FETCH_ITEM_LIST;
}

export type ItemActions =
  | AddItemStart
  | EditItemStart
  | DeleteItemStart;
