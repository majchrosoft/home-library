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
  BOOKCASE_FETCH_LIST,
  BookcaseActionSetList,
} from './bookcase.actions';
import { Bookcase } from '../bookcase.model';
import { nullToEmptyArray } from '../../../core/helper/array/nullToEmptyArray';
import { payloadFromActionData } from '../../../core/store/payloadFromActionData';

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
      return this.httpBookcaseRepository.all()
    }),
    map(
      (bookcases: Bookcase[]) => {
        return new BookcaseActionSetList(nullToEmptyArray(bookcases));
      }
    )
  )

  @Effect({ dispatch: false })
  storeItem = this.actions$.pipe(
    ofType(BOOKCASE_ADD),
    withLatestFrom(this.store.select('bookcase')),
    switchMap(
      ([actionData, itemState]) => {
        this.storedBookcase = payloadFromActionData(actionData);
        return this.httpBookcaseRepository.add(this.storedBookcase);
      }
    ),
    tap(() => {
      this.router.navigate(['/bookcases']);
    })
  )

  @Effect({ dispatch: false })
  updateBookcase = this.actions$.pipe(
    ofType(BOOKCASE_EDIT),
    withLatestFrom(this.store.select('bookcase')), switchMap(
      ([actionData, bookcaseState]) => {
        //@todo asks how to describe actionData type
        return this.httpBookcaseRepository.update(payloadFromActionData(actionData));
      }
    ),
    tap(() => {
      this.router.navigate(['/bookcases']);
    })
  )

}
