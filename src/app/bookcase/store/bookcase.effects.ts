import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpBookcaseRepository } from '../../../infrastructure/persistance/http/http-bookcase-repository';
import {
  BOOKCASE_ADD,
  BOOKCASE_EDIT,
  BOOKCASE_FETCH_LIST, BOOKCASE_SETUP_ID,
  BookcaseActionSetList,
  BookcaseActionSetupId
} from './bookcase.actions';
import { Bookcase } from '../bookcase.model';
import { nullToEmptyArray } from '../../../core/helper/array/nullToEmptyArray';
import { payloadFromActionData } from '../../../core/store/payloadFromActionData';
import { ResourcePostResponseBody } from '../../../infrastructure/persistance/http/response/resource-post-response-body';
import { SETUP_ID } from '../../item/store/item.actions';

@Injectable()
export class BookcaseEffects {

  private storedBookcase: Bookcase | null = null;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    private httpBookcaseRepository: HttpBookcaseRepository
  ) {
  }

  @Effect()
  fetchBookcases = this.actions$.pipe(
    ofType(BOOKCASE_FETCH_LIST),
    switchMap(() => {
      console.log('ASDASDASDASDASDwpada');
      return this.httpBookcaseRepository.all()
    }),
    map(
      (bookcases: Bookcase[]) => {
        return new BookcaseActionSetList(nullToEmptyArray(bookcases));
      }
    )
  )

  @Effect()
  storeItem = this.actions$.pipe(
    ofType(BOOKCASE_ADD),
    withLatestFrom(this.store.select('bookcase')),
    switchMap(
      ([actionData, itemState]) => {
        this.storedBookcase = payloadFromActionData(actionData);
        return this.httpBookcaseRepository.add(this.storedBookcase);
      }
    ),
    map(
      (response: ResourcePostResponseBody) => {
        const toBeReturned = new BookcaseActionSetupId({
          id: response.name,
          tempId: this.storedBookcase.id
        });
        this.storedBookcase = null;
        return toBeReturned;
      }
    )
  )

  @Effect()
  updateItem = this.actions$.pipe(
    ofType(BOOKCASE_EDIT),
    withLatestFrom(this.store.select('bookcase')),
  )

  @Effect({ dispatch: false })
  redirectToList = this.actions$.pipe(
    ofType(BOOKCASE_SETUP_ID),
    tap(() => {
      this.router.navigate(['/bookcases']);
    })
  );

}
