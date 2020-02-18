import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from 'rxjs/operators';
import { AuthState } from '../auth/store/auth-reducer';
import { User } from '../auth/user-model';
import { Logout } from '../auth/store/auth-actions';
import { Subscription } from 'rxjs';

let userStoreSubscription: Subscription;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    userStoreSubscription = this.store.select('auth')
      .pipe(
        map((authState: AuthState): User => authState.user)
      ).subscribe((user: User) => {
        this.isAuthenticated = !!user;
      })
  }

  onLogOut() {
    this.store.dispatch(new Logout());
  }

  ngOnDestroy(): void {
    userStoreSubscription.unsubscribe();
  }


}
