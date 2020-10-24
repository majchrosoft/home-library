import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserItem } from './user-item.model';
import { Observable, of } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';
import { ItemState } from './store/item.reducer';
import { FetchUserItemList, SET_USER_ITEM_LIST } from './store/item.actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<UserItem[]> {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<UserItem[]> |
    Promise<UserItem[]> |
    UserItem[] {
    return this.store.select('item').pipe(
      take(1),
      map((itemState: ItemState) => {
        return itemState.itemList;
      }),
      switchMap((items: UserItem[]) => {
        //@todo check what will happen if there will be 0 items
        if (items.length === 0) {
          this.store.dispatch(new FetchUserItemList());
          return this.actions$.pipe(
            ofType(SET_USER_ITEM_LIST),
            take(1)
          );
        } else {
          return of(items);
        }
      })
    )
  }
}
