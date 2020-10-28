import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserItem } from '../user-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ItemActionBorrow } from '../store/item.actions';
import { isNull } from 'util';
import { Borrow, factorizeEmptyBorrowed, factorizeIsBorrowed } from '../borrow-vo';
import { nullCoalesce } from '../../../core/helper/string/nullCoalesce';
import {
  factorizeBorrowFormDefinition,
  factorizeBorrowFormGroup,
  factorizeBorrowFormGroupFromEntity
} from './borrow-form-definition';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  form: FormGroup;
  @Input('userItem') userItem: UserItem;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {

    this.store.dispatch(
      new ItemActionBorrow({
        ...this.userItem,
        borrow: this.form.value
      })
    )
  }

  private initForm() {
    this.form = factorizeBorrowFormGroupFromEntity(this.userItem.borrow);
  }

}
