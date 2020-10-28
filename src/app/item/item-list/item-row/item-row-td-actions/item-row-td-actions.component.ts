import { Component, Input, OnInit } from '@angular/core';
import { UserItem } from '../../../user-item.model';
import { DeleteItem, FETCH_USER_ITEM_LIST, ItemActionGiveBackBorrowed } from '../../../store/item.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import { factorizeIsNotBorrowed } from '../../../borrow-vo';

@Component({
  selector: '[app-item-row-td-actions]',
  templateUrl: './item-row-td-actions.component.html',
  styleUrls: ['./item-row-td-actions.component.css']
})
export class ItemRowTdActionsComponent implements OnInit {

  @Input('item') item: UserItem;
  @Input('isNotBorrowed') isNotBorrowed: boolean;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }

  remove() {
    this.store.dispatch(new DeleteItem(this.item.id));
  }

  giveItemBack() {
    this.store.dispatch(new ItemActionGiveBackBorrowed({
      ...this.item,
      borrow: factorizeIsNotBorrowed()
    }));
  }

}
