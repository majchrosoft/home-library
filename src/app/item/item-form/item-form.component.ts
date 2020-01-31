import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import {
  ItemFormDefinitions,
  itemQualityScale,
  itemQualityScaleList,
  itemTypes,
  itemTypesArray,
  validatorErrorMessages
} from './item-form-definitions';
import { isObject } from 'util';

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

  private errorMessagesOfFormControl(formControlName: string): string[] {

    let formControl: AbstractControl = this.form.get(formControlName);

    if (
      !formControl.touched
      ||
      !isObject(formControl.errors)
    ) {
      return [];
    }
    return _.keys(formControl.errors).map(function(errorKey) {

      return (() => {
        if (
          !validatorErrorMessages.hasOwnProperty(formControlName)
          &&
          !validatorErrorMessages[formControlName].hasOwnProperty(errorKey)
        ) {
          return [];
        }
        return validatorErrorMessages[formControlName][errorKey];

      })();
      // return errorMessages(formControlName, errorKey, customErrorDefinitions);
    });


  }

}
