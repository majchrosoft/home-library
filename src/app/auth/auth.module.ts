import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }])

  ]
})
export class AuthModule {
}
