import { Component, Input, OnInit } from '@angular/core';
import { Bookcase } from '../../../bookcase.model';

@Component({
  selector: '[app-bookcase-row-td-actions]',
  templateUrl: './bookcase-row-td-actions.component.html',
  styleUrls: ['./bookcase-row-td-actions.component.css']
})
export class BookcaseRowTdActionsComponent implements OnInit {

  @Input('bookcase') bookcase: Bookcase;

  constructor() {
  }

  ngOnInit() {
  }

}
