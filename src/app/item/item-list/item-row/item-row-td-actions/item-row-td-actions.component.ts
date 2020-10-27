import { Component, Input, OnInit } from '@angular/core';
import { UserItem } from '../../../user-item.model';
import { DeleteItem, FETCH_USER_ITEM_LIST } from '../../../store/item.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';

@Component({
  selector: '[app-item-row-td-actions]',
  templateUrl: './item-row-td-actions.component.html',
  styleUrls: ['./item-row-td-actions.component.css']
})
export class ItemRowTdActionsComponent implements OnInit {

  @Input('item') item: UserItem;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }

  remove() {
    this.store.dispatch(new DeleteItem(this.item.id));
  }

}
