import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserItem } from '../../user-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bookcase } from '../../../bookcase/bookcase.model';
import { BookcaseState } from '../../../bookcase/store/bookcase.reducer';
import { ofProperty } from '../../../../core/helper/array/ofProperty';

@Component({
  selector: '[app-item-row]',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})
export class ItemRowComponent implements OnInit, OnDestroy {
  @Input('userItem') userItem: UserItem;
  @Input('index') index: number;

  bookcasesSubscription: Subscription;
  bookcases: Bookcase[] = [];

  public isNotBorrowed;

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

    this.bookcaseOfId(this.userItem.item.bookcase);
    this.isNotBorrowed = this.userItem === undefined || this.userItem.borrow === undefined || !this.userItem.borrow.isBorrowed;
  }

  ngOnDestroy(): void {
    this.bookcasesSubscription.unsubscribe()
  }

  bookcaseOfId(bookcaseId: string): Bookcase {
    return ofProperty<Bookcase, string>(this.bookcases, 'id', bookcaseId);
  }

}
