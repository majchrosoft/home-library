import { Component, OnDestroy, OnInit } from '@angular/core';

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
import { factorizeUserItem, UserItem } from '../user-item.model';
import { mapToId } from '../../shared/route-params-helpers';
import { isNull } from 'util';
import { AddUserItem, EditUserItem } from '../store/item.actions';
import { userItemOfId } from '../store/reducer-helpers';
import { Subscription } from 'rxjs';
import { BookcaseState } from '../../bookcase/store/bookcase.reducer';
import { Bookcase } from '../../bookcase/bookcase.model';
import { fromIdToUserItemSwitcher } from '../store/helpers/fromIdToUserItemSwitcher';
import { fromRouteParameterToUserItemSwitcher } from '../store/helpers/fromRouteParameterToUserItemSwitcher';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formDefinition: ItemFormDefinition;
  itemTypes: itemTypes[] = [];
  itemQualityScaleList: itemQualityScale[] = [];
  bookcases: Bookcase[] = [];
  bookcaseSubscription: Subscription;

  isEdit(): boolean {
    return !isNull(this.item);
  }

  title(): string {
    return this.isEdit() ? 'Edit' : 'Add';
  }

  id(): string | null {
    return !isNull(this.item) ? this.item.id : null;
  }

  submitButtonName(): string {
    return this.isEdit() ? 'Update' : 'Add';
  }

  item: UserItem | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  onSubmit() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }

    if (this.isEdit()) {
      this.store.dispatch(
        new EditUserItem({
          ...this.item,
          item: {
            ...this.form.value
          }
        })
      )
    } else {
      this.store.dispatch(
        new AddUserItem(factorizeUserItem(this.form.value, null))
      )
    }
  }

  ngOnInit() {
    this.formDefinition = new ItemFormDefinition();
    this.itemTypes = itemTypesArray;
    this.itemQualityScaleList = itemQualityScaleList;
    this.subscribeToRouteParameterChanges();

    this.bookcaseSubscription = this.store
      .select('bookcase')
      .pipe(
        map(
          (bookcaseState: BookcaseState) => {
            return bookcaseState.bookcaseList;
          }
        )
      ).subscribe(
        (bookcases: Bookcase[]) => {
          this.bookcases = bookcases;
        }
      )
  }

  ngOnDestroy(): void {
    this.bookcaseSubscription.unsubscribe();
  }

  public formControlErrorMessages(formControlName): string[] {
    return formControlErrorMessages(this.formDefinition, formControlName);
  }

  private subscribeToRouteParameterChanges() {
    fromRouteParameterToUserItemSwitcher(
      this.route.params,
      this.store
    ).subscribe(
      (item: UserItem) => {
        this.setItem(item);
        this.initForm(item);
      });
  }

  private switchIdToEntity(): any {
    return id => {
      return this.store.select('item').pipe(
        map(userItemOfId(id))
      );
    }
  }

  private setItem(item: UserItem | null): void {
    this.item = item;
  }

  private initForm(item: UserItem | null): void {
    this.form = (() => {
      if (isNull(item)) {
        return this.formDefinition.buildFormFromDefaultValues().form();
      } else {
        return this.formDefinition.buildFormFromEntity(item).form();
      }
    })();
  }

}
