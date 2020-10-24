import { Component, Input, OnInit } from '@angular/core';
import { Bookcase } from '../../bookcase.model';

@Component({
  selector: '[app-bookcase-row]',
  templateUrl: './bookcase-row.component.html',
  styleUrls: ['./bookcase-row.component.css']
})
export class BookcaseRowComponent implements OnInit {

  @Input('bookcase') bookcase: Bookcase;
  @Input('index') index: number;

  constructor() {
  }

  ngOnInit() {
  }

}
