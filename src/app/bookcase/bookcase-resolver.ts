import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Bookcase } from './bookcase.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { BookcaseState } from './store/bookcase.reducer';
import { BOOKCASE_SET_LIST, BookcaseActionFetchList } from './store/bookcase.actions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookcaseResolver implements Resolve<Bookcase[]> {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Bookcase[]> | Promise<Bookcase[]> | Bookcase[] {
    return this.store.select('bookcase').pipe(
      take(1),
      map((bookcaseState: BookcaseState) => {
        return bookcaseState.bookcaseList;
      }),
      switchMap((bookcases: Bookcase[]) => {
        //@todo check what will happen if there will be 0 bookcases
        if (bookcases.length === 0) {
          this.store.dispatch(new BookcaseActionFetchList());
          return this.actions$.pipe(
            ofType(BOOKCASE_SET_LIST),
            take(1)
          )
        } else {
          return of(bookcases);
        }
      })
    )
  }
}
