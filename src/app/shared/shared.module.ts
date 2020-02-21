import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMessageComponent } from './form-message/form-message.component';
import { FormMessageErrorComponent } from './form-message/form-message-error/form-message-error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';


@NgModule({
  declarations: [
    FormMessageComponent,
    FormMessageErrorComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormMessageComponent,
    FormMessageErrorComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {
}
