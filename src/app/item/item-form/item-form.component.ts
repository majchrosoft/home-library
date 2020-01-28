import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormDefinitions } from './item-form-definitions';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private itemFormDefinitions: ItemFormDefinitions
  ) {
  }

  ngOnInit() {
    this.form = this.itemFormDefinitions.create();
  }

}
