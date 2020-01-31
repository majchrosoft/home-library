import { Component, OnInit } from '@angular/core';

import {
  ItemFormDefinition,
  itemQualityScale,
  itemQualityScaleList,
  itemTypes,
  itemTypesArray,
} from './item-form-definition';
import { formControlErrorMessages } from '../../shared/form-control-error-messages';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  form: FormGroup;
  formDefinition: ItemFormDefinition;
  itemTypes: itemTypes[];
  itemQualityScaleList: itemQualityScale[];
  isEdit: boolean = false;

  onAdd() {
    console.log(this.formDefinition.form().getRawValue());
  }

  ngOnInit() {
    this.formDefinition = new ItemFormDefinition();
    this.form = this.formDefinition.form();
    this.itemTypes = itemTypesArray;
    this.itemQualityScaleList = itemQualityScaleList;
  }

  public formControlErrorMessages(formControlName): string[] {
    return formControlErrorMessages(this.formDefinition, formControlName);
  }

}
