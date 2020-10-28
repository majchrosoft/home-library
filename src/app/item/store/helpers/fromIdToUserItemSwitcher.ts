import { map } from 'rxjs/operators';
import { userItemOfId } from '../reducer-helpers';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';

export function fromIdToUserItemSwitcher(store: Store<AppState>): any {
  return id => {
    return this.store.select('item').pipe(
      map(userItemOfId(id))
    );
  }
}
