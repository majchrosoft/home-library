import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Bookcase } from '../../../bookcase.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ItemState } from '../../../../item/store/item.reducer';
import { UserItem } from '../../../../item/user-item.model';
import { BookcaseActionDelete } from '../../../store/bookcase.actions';

@Component({
  selector: '[app-bookcase-row-td-actions]',
  templateUrl: './bookcase-row-td-actions.component.html',
  styleUrls: ['./bookcase-row-td-actions.component.css']
})
export class BookcaseRowTdActionsComponent implements OnInit, OnDestroy {

  @Input('bookcase') bookcase: Bookcase;

  itemSubscription: Subscription;
  isBookcaseEmpty: boolean | null = null;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.itemSubscription = this.store
      .select('item')
      .pipe(
        map((itemState: ItemState): UserItem[] => {
          return itemState.itemList;
        })
      ).subscribe((list: UserItem[]) => {
        this.isBookcaseEmpty = list.filter((userItem: UserItem) => {
          return userItem.item.bookcase === this.bookcase.id;
        }).length === 0;
      })
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }


  remove() {
    if (!this.isBookcaseEmpty) {
      alert('Cannot remove non empty bookcase');
      return;
    }

    this.store.dispatch(new BookcaseActionDelete(this.bookcase.id));

  }
}
