import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BookcaseListComponent } from './bookcase-list/bookcase-list.component';
import { NgModule } from '@angular/core';
import { BookcaseResolver } from './bookcase-resolver';
import { BookcaseFormComponent } from './bookcase-form/bookcase-form.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: [BookcaseResolver],
    children: [
      {
        path: '',
        component: BookcaseListComponent,
        resolve: [BookcaseResolver]
      },
      {
        path: 'add',
        component: BookcaseFormComponent,
      },
      {
        path: ':id/edit',
        component: BookcaseFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class BookcaseRoutingModule {

}
