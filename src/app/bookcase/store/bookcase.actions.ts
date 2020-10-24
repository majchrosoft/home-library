import { Action } from '@ngrx/store';
import { Bookcase } from '../bookcase.model';

export const BOOKCASE_ADD = '[bookcase] Add';
export const BOOKCASE_EDIT = '[bookcase] Edit';
export const BOOKCASE_DELETE = '[bookcase] Delete';
export const BOOKCASE_SET_LIST = '[bookcase] Set List';
export const BOOKCASE_FETCH_LIST = '[bookcase] Fetch List';
export const BOOKCASE_STORE_LIST = '[bookcase] Store List';
export const BOOKCASE_SETUP_ID = '[bookcase] Setup Id';

export class BookcaseActionAdd implements Action {
  readonly type = BOOKCASE_ADD;

  constructor(public payload: Bookcase) {
  }
}

export class BookcaseActionEdit implements Action {
  readonly type = BOOKCASE_EDIT;

  constructor(public payload: Bookcase) {
  }
}

export class BookcaseActionDelete implements Action {
  readonly type = BOOKCASE_DELETE;

  constructor(public payload: string) {
  }
}

export class BookcaseActionSetList implements Action {
  readonly type = BOOKCASE_SET_LIST;

  constructor(public payload: Bookcase[]) {
  }
}

export class BookcaseActionFetchList implements Action {
  readonly type = BOOKCASE_FETCH_LIST;
}

export class BookcaseActionStoreList implements Action {
  readonly type = BOOKCASE_STORE_LIST;
}

export class BookcaseActionSetupId implements Action {
  readonly type = BOOKCASE_SETUP_ID;

  constructor(public payload: { id: string, tempId: string }) {
  }
}

export type BookcaseActions =
  | BookcaseActionAdd
  | BookcaseActionEdit
  | BookcaseActionDelete
  | BookcaseActionSetList
  | BookcaseActionFetchList
  | BookcaseActionStoreList
  | BookcaseActionSetupId
  ;
