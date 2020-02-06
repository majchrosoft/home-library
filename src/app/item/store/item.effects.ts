import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ADD_ITEM, EDIT_ITEM, FETCH_ITEM_LIST, SetItemList, STORE_ITEM_LIST } from './item.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Item } from '../item.model';
import { ItemState } from './item.reducer';

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
    ofType(FETCH_ITEM_LIST),
    switchMap(() => {
      return this.http.get<Item[]>(
        'https://home-library-d13b5.firebaseio.com/items.json'
      )
    }),
    map(
      (items: Item[]) => {
        return new SetItemList(items);
      })
  );

  @Effect({ dispatch: false })
  storeItems = this.actions$.pipe(
    ofType(ADD_ITEM, EDIT_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        return this.http.put(
          'https://home-library-d13b5.firebaseio.com/items.json',
          itemState.itemList
        )
      }
    )
  );
}
