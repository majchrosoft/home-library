import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class BookcaseEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {
  }


}
