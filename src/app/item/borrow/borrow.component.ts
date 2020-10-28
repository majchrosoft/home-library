import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserItem } from '../user-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ItemActionBorrow } from '../store/item.actions';
import {
  factorizeBorrowFormGroupFromEntity
} from './borrow-form-definition';
import { map, switchMap } from 'rxjs/operators';
import { mapToId } from '../../shared/route-params-helpers';
import { userItemOfId } from '../store/reducer-helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { fromIdToUserItemSwitcher } from '../store/helpers/fromIdToUserItemSwitcher';
import { fromRouteParameterToUserItemSwitcher } from '../store/helpers/fromRouteParameterToUserItemSwitcher';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  public controlNames: string[] = [
    'Expected end at',
    'Borrower email',
    'Borrower name',
    'Borrower data',
  ];

  public controls: string[] = [
    'isBorrowed',
    'expectedEndAt',
    'borrowerEmail',
    'borrowerName',
  ];

  public controlPlaceholders: string[] = [
    'Expected end at',
    'Borrower email',
    'Borrower name',
    'Borrower data',
  ];

  form: FormGroup;
  userItem: UserItem;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.subscribeToRouteParameterChanges();
  }

  onSubmit() {

    this.store.dispatch(
      new ItemActionBorrow({
        ...this.userItem,
        borrow: {
          ...this.userItem.borrow,
          ...this.form.value
        }

      })
    )
  }

  private initForm() {
    this.form = factorizeBorrowFormGroupFromEntity(this.userItem.borrow);
  }

  private subscribeToRouteParameterChanges() {
    console.log('fromRouteParameterToUserIdSwitcher:');
    fromRouteParameterToUserItemSwitcher(
      this.route.params,
      this.store
    ).subscribe(
      (userItem: UserItem) => {
        console.log('userItem:');
        console.log(userItem);
        this.userItem = userItem;
        this.initForm();
      });
  }

}
