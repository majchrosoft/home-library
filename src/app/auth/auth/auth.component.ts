import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { NgForm } from '@angular/forms';
import { LOGIN_START, LoginStart, SIGNUP_START, SignupStart } from '../store/auth-actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {

  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email: string = form.value.email;
    const password: string = form.value.password;

    const dispatchLoginStart = () => {
      this.store.dispatch(
        new LoginStart({ email: email, password: password })
      );
    };

    const dispatchSignUpStart = () => {

      this.store.dispatch(
        new SignupStart({ email: email, password: password })
      );
    };

    const formActionsMap = new Map([
      [true, dispatchLoginStart],
      [false, dispatchSignUpStart]
    ]);

    if (!formActionsMap.has(this.isLoginMode)) {
      throwError('internal error');
    }

    formActionsMap.get(this.isLoginMode)();
    form.reset();

  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
