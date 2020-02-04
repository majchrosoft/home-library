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
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Item } from '../item.model';
import { mapToId } from '../../shared/route-params-helpers';
import { reduceItemStateToEntity } from '../../shared/reducer-helpers';

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
  item: Item | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  onSubmit() {
    console.log(this.formDefinition.form().getRawValue());
  }

  ngOnInit() {
    this.formDefinition = new ItemFormDefinition();
    this.form = this.formDefinition.form();
    this.itemTypes = itemTypesArray;
    this.itemQualityScaleList = itemQualityScaleList;

    this.initForm();


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
  private initForm() {
    this.route.params
      .pipe(
        map(mapToId()),
        switchMap(this.switchIdToEntity()),
      ).subscribe(
      (item: Item) => {
        this.item = item;
      });
  }

  private switchIdToEntity(): any {
    return id => {
      return this.store.select('item').pipe(
        map(reduceItemStateToEntity(id))
      );
    }
  }

}
