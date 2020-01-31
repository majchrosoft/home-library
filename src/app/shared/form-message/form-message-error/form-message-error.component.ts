import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-message-error',
  templateUrl: './form-message-error.component.html',
  styleUrls: ['./form-message-error.component.css']
})
export class FormMessageErrorComponent implements OnInit {

  constructor() {
  }

  @Input('message') message: string;

  ngOnInit() {
  }

}
