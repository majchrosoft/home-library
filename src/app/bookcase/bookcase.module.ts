import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BookcaseListComponent } from './bookcase-list/bookcase-list.component';
import { BookcaseRoutingModule } from './bookcase-routing.module';

@NgModule({
  declarations: [
    BookcaseListComponent
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
