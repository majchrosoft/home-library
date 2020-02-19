import { Component, Input, OnInit } from '@angular/core';
import { UserItem } from '../../user-item.model';

@Component({
  selector: '[app-item-row]',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})
export class ItemRowComponent implements OnInit {
  @Input('userItem') userItem: UserItem;
  @Input('index') index: number;

  constructor() {
  }

  ngOnInit() {
  }

}
