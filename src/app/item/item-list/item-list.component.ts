import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Item } from '../item.model';
import { map } from 'rxjs/operators';
import { ItemState } from '../store/item.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Item[];

  itemsSubscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.itemsSubscription = this.store
      .select('item')
      .pipe(
        map(
          (itemState: ItemState) => {
            return itemState.itemList;
          }
        )
      ).subscribe(
        (itemList: Item[]) => {
          this.items = itemList;
        }
      )
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }


}
