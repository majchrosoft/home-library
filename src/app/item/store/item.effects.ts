import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import {
  ADD_USER_ITEM,
  AddEditUserItemPayload,
  EDIT_USER_ITEM,
  FETCH_USER_ITEM_LIST,
  SetUserItemList,
  STORE_ITEM_LIST
} from './item.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { factorizeUserItem, UserItem } from '../user-item.model';
import { HttpUserItemServiceRepository } from '../../../infrastructure/persistance/http/http-user-item-service-repository';
import { Item } from '../item.vo';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private httpUserItemServiceRepository: HttpUserItemServiceRepository
  ) {
  }

  @Effect({ dispatch: false })
  fetchItems = this.actions$.pipe(
    ofType(FETCH_USER_ITEM_LIST),
    switchMap(() => {
      return this.httpUserItemServiceRepository.all()
    }),
    map(
      (items: UserItem[]) => {
        return new SetUserItemList(items);
      })
  );

  @Effect({ dispatch: false })
  storeItem = this.actions$.pipe(
    ofType(ADD_USER_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        return this.httpUserItemServiceRepository.add(factorizeUserItem(actionData['payload']));
      }
    )
  );

  @Effect({ dispatch: false })
  updateItem = this.actions$.pipe(
    ofType(EDIT_USER_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        return this.httpUserItemServiceRepository.update(factorizeUserItem(actionData['payload']));
      }
    )
  );
}
