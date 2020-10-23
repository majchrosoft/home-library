import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemComponent } from './item/item.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item/store/item.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemRowComponent } from './item/item-list/item-row/item-row.component';
import { ItemRowTdActionsComponent } from './item/item-list/item-row/item-row-td-actions/item-row-td-actions.component';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { BookcaseComponent } from './bookcase/bookcase.component';
import { BookcaseListComponent } from './bookcase/bookcase-list/bookcase-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookcaseComponent,
    BookcaseListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    SharedModule,
    EffectsModule.forRoot([ItemEffects, AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
