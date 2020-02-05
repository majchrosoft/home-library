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
import { isNull } from 'util';
import { AddItem, EditItem } from '../store/item.actions';

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

  isEdit(): boolean {
    return !isNull(this.item);
  }

  id(): string | null {
    return !isNull(this.item) ? this.item.id : null;
  }

  item: Item | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  onSubmit() {
    if (this.isEdit()) {
      this.store.dispatch(
        new EditItem({
          id: this.id(),
          newItem: this.form.value
        })
      )
    } else {
      this.store.dispatch(
        new AddItem(
          this.form.value
        )
      )
    }
  }

  ngOnInit() {
    this.formDefinition = new ItemFormDefinition();
    this.itemTypes = itemTypesArray;
    this.itemQualityScaleList = itemQualityScaleList;
    this.subscribeToRouteParameterChanges();
  }

  public formControlErrorMessages(formControlName): string[] {
    return formControlErrorMessages(this.formDefinition, formControlName);
  }

  private subscribeToRouteParameterChanges() {
    this.route.params
      .pipe(
        map(mapToId()),
        switchMap(this.switchIdToEntity()),
      ).subscribe(
      (item: Item) => {
        this.setItem(item);
        this.initForm(item);
      });
  }

  private switchIdToEntity(): any {
    return id => {
      return this.store.select('item').pipe(
        map(reduceItemStateToEntity(id))
      );
    }
  }

  private setItem(item: Item | null): void {
    this.item = item;
  }

  private initForm(item: Item | null): void {
    this.form = (() => {
      if (isNull(item)) {
        return this.formDefinition.buildFormFromDefaultValues().form();
      } else {
        return this.formDefinition.buildFormFromEntity(item).form();
      }
    })();
  }

}
