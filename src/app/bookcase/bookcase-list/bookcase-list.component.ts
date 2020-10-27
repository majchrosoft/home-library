import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bookcase } from '../bookcase.model';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { BookcaseState } from '../store/bookcase.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookcase-list',
  templateUrl: './bookcase-list.component.html',
  styleUrls: ['./bookcase-list.component.css']
})
export class BookcaseListComponent implements OnInit, OnDestroy {

  bookcases: Bookcase[];

  bookcasesSubscription: Subscription

  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.bookcasesSubscription = this.store
      .select('bookcase')
      .pipe(
        map((bookcaseState: BookcaseState) => {
          return bookcaseState.bookcaseList;
        })
      ).subscribe(
        (bookcaseList: Bookcase[]) => {
          this.bookcases = bookcaseList;
        })
  }

  ngOnDestroy(): void {
    this.bookcasesSubscription.unsubscribe();
  }

}
