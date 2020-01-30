import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormDefinitions, itemTypes, itemTypesArray } from './item-form-definitions';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;
  itemTypes: itemTypes[];

  onAdd() {
    console.log(this.form.getRawValue());
  }

  constructor(
    private itemFormDefinitions: ItemFormDefinitions,
  ) {
  }

  ngOnInit() {
    this.form = this.itemFormDefinitions.create();
    this.itemTypes = itemTypesArray;
  }

}
