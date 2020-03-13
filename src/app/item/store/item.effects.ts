import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ADD_USER_ITEM, EDIT_USER_ITEM, FETCH_USER_ITEM_LIST, SetupId, SetUserItemList } from './item.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { factorizeUserItem, UserItem } from '../user-item.model';
import { HttpUserItemServiceRepository } from '../../../infrastructure/persistance/http/http-user-item-service-repository';
import { setupFirebaseProject } from '@angular/fire/schematics';
import { ResourcePostResponseBody } from '../../../infrastructure/persistance/http/response/resource-post-response-body';
import { isNull } from 'util';

@Injectable()
export class ItemEffects {

  // @todo remove this stupid anti-pattern asap to get knowledge how to properly operate with streams
  private storedUserItem: UserItem | null = null;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private httpUserItemServiceRepository: HttpUserItemServiceRepository
  ) {
  }

  @Effect()
  fetchItems = this.actions$.pipe(
    ofType(FETCH_USER_ITEM_LIST),
    switchMap(() => {
      return this.httpUserItemServiceRepository.all()
    }),
    map(
      (itemsArg: UserItem[] | null) => {
        const items = isNull(itemsArg) ? [] : itemsArg;
        return new SetUserItemList(items);
      })
  );


  @Effect()
  storeItem = this.actions$.pipe(
    ofType(ADD_USER_ITEM),
    withLatestFrom(this.store.select('item')),
    switchMap(
      ([actionData, itemState]) => {
        // @todo remove this stupid anti-pattern asap to get knowledge how to properly operate with streams
        console.log(actionData['payload']);
        this.storedUserItem = actionData['payload'];
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
        return this.httpUserItemServiceRepository.update(factorizeUserItem(actionData['payload']));
      }
    )
  );
}
