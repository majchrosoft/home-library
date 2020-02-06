import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})
export class ItemRowComponent implements OnInit {
  @Input('item') item: Item;
  @Input('index') index: number;

  constructor() {
  }

  ngOnInit() {
  }

}
