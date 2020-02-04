import { ItemState } from '../item/store/item.reducer';
import { castUndefinedToNull } from './core.helpers';
import { Item } from '../item/item.model';

export function reduceItemStateToEntity(id: string | null) {
  return (itemState: ItemState) => {
    return castUndefinedToNull(itemState.itemList.find((item: Item) => {
      return item.id === id;
    }));
  }

}
