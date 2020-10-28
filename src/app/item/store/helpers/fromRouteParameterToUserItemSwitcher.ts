import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { mapToId } from '../../../shared/route-params-helpers';
import { fromIdToUserItemSwitcher } from './fromIdToUserItemSwitcher';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

export function fromRouteParameterToUserItemSwitcher(routeParameterList: Params, store: Store<AppState>): any {

  return routeParameterList
    .pipe(
      map(mapToId()),
      switchMap(fromIdToUserItemSwitcher(store)),
    );
}
