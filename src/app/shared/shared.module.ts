import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMessageComponent } from './form-message/form-message.component';
import { FormMessageErrorComponent } from './form-message/form-message-error/form-message-error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [FormMessageComponent, FormMessageErrorComponent, LoadingSpinnerComponent],
  exports: [
    FormMessageErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
