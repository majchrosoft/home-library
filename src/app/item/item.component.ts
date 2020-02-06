import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { FetchItemList } from './store/item.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchItemList());
  }

}
