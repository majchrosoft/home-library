import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import {
  ADD_USER_ITEM,
  EDIT_USER_ITEM,
  FETCH_USER_ITEM_LIST,
  SETUP_ID,
  SetupId,
  SetUserItemList
} from './item.actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpUserItemServiceRepository } from '../../../infrastructure/persistance/http/http-user-item-service-repository';
import { ResourcePostResponseBody } from '../../../infrastructure/persistance/http/response/resource-post-response-body';
import { Router } from '@angular/router';
import { nullToEmptyArray } from '../../../core/helper/array/nullToEmptyArray';
import { payloadFromActionData } from '../../../core/store/payloadFromActionData';
import { UserItem } from '../user-item.model';

@Injectable()
export class ItemEffects {

  // @todo remove this stupid anti-pattern asap to get knowledge how to properly operate with streams
  private storedUserItem: UserItem | null = null;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private httpUserItemServiceRepository: HttpUserItemServiceRepository,
    private router: Router
  ) {
  }

  @Effect()
  fetchItems = this.actions$.pipe(
    ofType(FETCH_USER_ITEM_LIST),
    switchMap(() => {
      return this.httpUserItemServiceRepository.all()
    }),
    map(
      (items: UserItem[] | null) => {
        return new SetUserItemList(nullToEmptyArray(items));
      })
  );


  @Effect()
  storeItem = this.actions$.pipe(
    ofType(ADD_USER_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        // @todo remove this stupid anti-pattern asap to get knowledge how to properly operate with streams
        this.storedUserItem = payloadFromActionData(actionData);
        console.log(this.storedUserItem);
        return this.httpUserItemServiceRepository.add(this.storedUserItem);
      }
    ),
    map((
      response: ResourcePostResponseBody,
    ) => {
      const toBeReturned = new SetupId({
        id: response.name,
        tempId: this.storedUserItem.id
      });

      // @todo remove this stupid anti-pattern asap to get knowledge how to properly operate with streams
      this.storedUserItem = null;

      return toBeReturned;

    })
  );

  @Effect({ dispatch: false })
  updateItem = this.actions$.pipe(
    ofType(EDIT_USER_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        return this.httpUserItemServiceRepository.update(payloadFromActionData(actionData));
      }
    ),
    tap(() => {
      this.router.navigate(['/items']);
    })
  );

  @Effect({ dispatch: false })
  redirectToList = this.actions$.pipe(
    ofType(SETUP_ID),
    tap(() => {
      this.router.navigate(['/items']);
    })
  );
}
