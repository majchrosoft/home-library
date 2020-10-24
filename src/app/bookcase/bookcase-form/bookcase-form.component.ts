import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookcaseFormDefinition } from './bookcase-form-definition';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { isNull } from 'util';
import { Bookcase, factorizeBookcase } from '../bookcase.model';
import { map, switchMap } from 'rxjs/operators';
import { mapToId } from '../../shared/route-params-helpers';
import { UserItem } from '../../item/user-item.model';
import { bookcaseOfId } from '../store/reducer-helpers';
import { BookcaseActionAdd, BookcaseActionEdit } from '../store/bookcase.actions';

@Component({
  selector: 'app-bookcase-form',
  templateUrl: './bookcase-form.component.html',
  styleUrls: ['./bookcase-form.component.css']
})
export class BookcaseFormComponent implements OnInit {

  form: FormGroup;
  bookcaseFormDefinition: BookcaseFormDefinition;
  bookcase: Bookcase | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.bookcaseFormDefinition = new BookcaseFormDefinition();
    this.subscribeToRouteParameterChanges();
  }

  onSubmit() {
    if (this.isEdit()) {
      this.store.dispatch(
        new BookcaseActionEdit({
          ...this.form.value
        })
      )
    } else {
      this.store.dispatch(
        new BookcaseActionAdd(factorizeBookcase(this.form.value.id, this.form.value.name))
      );
    }
  }

  isEdit(): boolean {
    return !isNull(this.bookcase);
  }

  id(): string | null {
    return !isNull(this.bookcase) ? this.bookcase.id : null;
  }

  submitButtonName(): string {
    return this.isEdit() ? 'Update' : 'Add';
  }

  private subscribeToRouteParameterChanges() {
    this.route.params
      .pipe(
        map(mapToId()),
        switchMap(this.switchIdToEntity()),
      ).subscribe(
      (bookcase: Bookcase) => {
        this.setBookcase(bookcase);
        this.initForm(item);
      });
  }

  private switchIdToEntity(): any {
    return id => {
      return this.store.select('bookcase').pipe(
        map(bookcaseOfId(id))
      );
    }
  }

  private setBookcase(bookcase: Bookcase | null): void {
    this.bookcase = bookcase;
  }

  private initForm(bookcase: Bookcase | null): void {
    this.form = (() => {
      if (isNull(bookcase)) {
        return this.bookcaseFormDefinition.buildFormFromDefaultValues().form();
      } else {
        return this.bookcaseFormDefinition.buildFormFromEntity(bookcase).form();
      }
    })();
  }


}
