import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../item.model';

@Component({
  selector: '[app-item-row-td-actions]',
  templateUrl: './item-row-td-actions.component.html',
  styleUrls: ['./item-row-td-actions.component.css']
})
export class ItemRowTdActionsComponent implements OnInit {

  @Input('item') item: Item;

  constructor() {
  }

  ngOnInit() {
  }

}
