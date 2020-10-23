import { Action } from '@ngrx/store';
import { Bookcase } from '../bookcase.model';

export const ADD = '[bookcase] Add';
export const EDIT = '[bookcase] Edit';
export const DELETE = '[bookcase] Delete';
export const SET_LIST = '[bookcase] Set List';
export const FETCH_LIST = '[bookcase] Fetch List';
export const STORE_LIST = '[bookcase] Store List';
export const SETUP_ID = '[bookcase] Setup Id';

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Bookcase) {
  }
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: Bookcase) {
  }
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: string) {
  }
}

export class SetList implements Action {
  readonly type = SET_LIST;

  constructor(public payload: Bookcase[]) {
  }
}

export class FetchList implements Action {
  readonly type = FETCH_LIST;
}

export class StoreList implements Action {
  readonly type = STORE_LIST;
}

export class SetupId implements Action {
  readonly type = SETUP_ID;

  constructor(public payload: { id: string, tempId: string }) {
  }
}
