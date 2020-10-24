import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BookcaseListComponent } from './bookcase-list/bookcase-list.component';
import { BookcaseRoutingModule } from './bookcase-routing.module';
import { BookcaseFormComponent } from './bookcase-form/bookcase-form.component';

@NgModule({
  declarations: [
    BookcaseListComponent,
    BookcaseFormComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    BookcaseRoutingModule,
    SharedModule
  ]
})
export class BookcaseModule {

}
