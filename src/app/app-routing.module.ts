import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { ItemListComponent } from './item/item-list/item-list.component';

const appRoutes: Routes = [
  { path: 'items', loadChildren: './item/item.module#ItemModule' },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
