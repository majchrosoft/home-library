import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit, OnDestroy {

  routeParameterSubscription: Subscription;

  public controlNames: string[] = [
    'Borrower email',
    'Borrower name',
    'Borrower data',
  ];

  public controls: string[] = [
    'borrowerEmail',
    'borrowerName',
    'borrowerData',
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

  ngOnDestroy(): void {
    this.routeParameterSubscription.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(
      new ItemActionBorrow({
        ...this.userItem,
        borrow: {
          ...this.userItem.borrow,
          isBorrowed: true,
          startAt: +Date.now(),
          expectedEndAt: +this.form.value.expectedEndAt,
          borrowerName: this.form.value.borrowerName,
          borrowerEmail: this.form.value.borrowerEmail,
          borrowerData: this.form.value.borrowerData,
        }
      })
    );
  }

  private initForm() {
    this.form = factorizeBorrowFormGroupFromEntity(this.userItem.borrow === undefined ? null : this.userItem.borrow);
  }

  private subscribeToRouteParameterChanges() {
    this.routeParameterSubscription = fromRouteParameterToUserItemSwitcher(
      this.route.params,
      this.store
    ).subscribe(
      (userItem: UserItem) => {
        this.userItem = userItem;
        this.initForm();
      });
  }

}
