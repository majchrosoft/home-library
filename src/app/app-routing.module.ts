import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

const appRoutes: Routes = [
  { path: 'item/add', component: ItemFormComponent },
  { path: 'item', component: HeaderComponent }
  // { path: '/item', pathMatch: 'full' }
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
