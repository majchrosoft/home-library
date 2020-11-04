import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthState } from './store/auth-reducer';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {
console.log('wpdasdfsdfdfdfs');
    return this.store.select('auth').pipe(
      take(1),
      map((authState: AuthState) => {
        return authState.user;
      }),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        }
        console.log('wpdasdfsdfdfdfs');
        return this.router.createUrlTree(['/auth']);

      })
    )

  }

}
