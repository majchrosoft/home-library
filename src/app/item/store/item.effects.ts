import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ADD_USER_ITEM, EDIT_USER_ITEM, FETCH_USER_ITEM_LIST, SetUserItemList, STORE_ITEM_LIST } from './item.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UserItem } from '../user-item.model';
import { ItemState } from './item.reducer';
import { userDataStorageService } from '../../auth/user-data-storage-service';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {
  }

  @Effect({ dispatch: false })
  fetchItems = this.actions$.pipe(
    ofType(FETCH_USER_ITEM_LIST),
    switchMap(() => {
      return this.http.get<UserItem[]>(
        'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.getUser().id + '/items.json'
      )
    }),
    map(
      (items: UserItem[]) => {
        return new SetUserItemList(items);
      })
  );

  @Effect({ dispatch: false })
  storeItems = this.actions$.pipe(
    ofType(ADD_USER_ITEM, EDIT_USER_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        return this.http.put(
          'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.getUser().id + '/items.json',
          itemState.itemList
        )
      }
    )
  );
}
