import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BookcaseListComponent } from './bookcase-list/bookcase-list.component';
import { BookcaseRoutingModule } from './bookcase-routing.module';
import { BookcaseFormComponent } from './bookcase-form/bookcase-form.component';
import { BookcaseRowComponent } from './bookcase-list/bookcase-row/bookcase-row.component';
import { BookcaseRowTdActionsComponent } from './bookcase-list/bookcase-row/bookcase-row-td-actions/bookcase-row-td-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    BookcaseListComponent,
    BookcaseFormComponent,
    BookcaseRowComponent,
    BookcaseRowTdActionsComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    BookcaseRoutingModule,
    SharedModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class BookcaseModule {

}
