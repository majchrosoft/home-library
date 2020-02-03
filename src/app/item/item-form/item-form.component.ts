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
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNull } from 'util';


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
  shelves: string[];
  shelveNames: string[];
  isEdit: boolean = false;
  id: string | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  onAdd() {
    console.log(this.formDefinition.form().getRawValue());
  }

  ngOnInit() {
    this.formDefinition = new ItemFormDefinition();
    this.form = this.formDefinition.form();
    this.itemTypes = itemTypesArray;
    this.itemQualityScaleList = itemQualityScaleList;

    this.subscribeToRouteParams();


  }

  public formControlErrorMessages(formControlName): string[] {
    return formControlErrorMessages(this.formDefinition, formControlName);
  }

  /**
   * @todo anti-pattern
   * concurrency flow possible problem. how to force that resolveId must be before resolveIsEdit
   * in
   *
   * @todo fatalError
   * propably bad call of subscribe method
   */
  private subscribeToRouteParams() {
    this.route.params.subscribe(
      this.resolveId,
      this.resolveIsEdit,
      () => {
        this.initForm();
      }
    )
  }

  private resolveId(params: Params) {
    this.id = params['id'];
  }

  private resolveIsEdit(params: Params) {
    this.isEdit = !isNull(params['id']);
  }

  private initForm() {

  }

}
