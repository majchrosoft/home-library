import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemResolver } from './item-resolver';
import { NgModule } from '@angular/core';
import { BorrowComponent } from './borrow/borrow.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: [ItemResolver],
    children: [
      { path: '', component: ItemListComponent, resolve: [ItemResolver] },
      { path: 'add', component: ItemFormComponent },
      { path: ':id/edit', component: ItemFormComponent },
      { path: ':id/borrow', component: BorrowComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ItemRoutingModule {

}
