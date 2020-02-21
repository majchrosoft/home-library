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
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ItemComponent,
    ItemFormComponent,
    ItemListComponent,
    ItemRowComponent,
    ItemRowTdActionsComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ItemRoutingModule,
    SharedModule
  ]
})
export class ItemModule {

}
