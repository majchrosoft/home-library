import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  isbnErrorMessages,
  ItemFormDefinitions,
  itemQualityScale,
  itemQualityScaleList,
  itemTypes,
  itemTypesArray, validatorErrorMessages
} from './item-form-definitions';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;
  itemTypes: itemTypes[];
  itemQualityScaleList: itemQualityScale[];
  isEdit: boolean = false;
  validatorErrorMessages: any[] = validatorErrorMessages;

  onAdd() {
    console.log(this.form.getRawValue());
  }

  constructor(
    private itemFormDefinitions: ItemFormDefinitions,
  ) {
  }

  ngOnInit() {
    this.form = this.itemFormDefinitions.create();
    console.log(this.form);
    this.itemTypes = itemTypesArray;
    this.itemQualityScaleList = itemQualityScaleList;

    console.log(this.form.get('isbn').errors);

  }

  private isbnErrorMessages(): string[] {
    //@todo restruct to array then map remove local msgs;
    let msgs = [];
    let isbnErrors =
      this.form.get('isbn').touched &&
      this.form.get('isbn').errors;

    for (let error in isbnErrors) {
      if (!isbnErrors.hasOwnProperty(error)) {
        continue;
      }

      msgs.push(isbnErrorMessages[error]);

    }
    return msgs;

  }

}
