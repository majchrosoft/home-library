import { ItemState } from './item.reducer';
import { castUndefinedToNull } from '../../shared/core.helpers';
import { UserItem } from '../user-item.model';

export function userItemOfId(id: string | null) {
  return (itemState: ItemState) => {
    return castUndefinedToNull(itemState.itemList.find((item: UserItem) => {
      return item.id === id;
    }));
  }
}
