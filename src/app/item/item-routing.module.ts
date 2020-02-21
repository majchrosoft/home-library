import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemResolver } from './item-resolver';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    // resolve: [ItemResolver],
    children: [
      { path: '', component: ItemListComponent },
      { path: 'add', component: ItemFormComponent },
      { path: ':id/edit', component: ItemFormComponent },
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
