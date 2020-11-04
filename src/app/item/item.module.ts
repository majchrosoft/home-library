import { NgModule } from '@angular/core';
import { ItemComponent } from './item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { RouterModule } from '@angular/router';
import { ItemRoutingModule } from './item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemRowComponent } from './item-list/item-row/item-row.component';
import { ItemRowTdActionsComponent } from './item-list/item-row/item-row-td-actions/item-row-td-actions.component';
import { BorrowComponent } from './borrow/borrow.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ItemComponent,
    ItemFormComponent,
    ItemListComponent,
    ItemRowComponent,
    ItemRowTdActionsComponent,
    BorrowComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ItemRoutingModule,
    SharedModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ]
})
export class ItemModule {

}
