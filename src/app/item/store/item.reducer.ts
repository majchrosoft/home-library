import { Item } from '../item.model';
import { ADD_ITEM_START, DELETE_ITEM_START, EDIT_ITEM_START, ItemActions } from './item.actions';
import * as uuid from 'uuid/v4';

export interface ItemState {
  itemList: Item[];
  editedItem: Item | null,
  editedItemId: string | null
}


const initialState: ItemState = {
  itemList: [],
  editedItem: null,
  editedItemId: null
};

export function itemReducer(
  state: ItemState = initialState,
  action: ItemActions
) {
  switch (action.type) {
    case ADD_ITEM_START:
      return {
        ...state,
        itemList: [...state.itemList, {
          id: uuid(),
          ...action.payload
        }]
      };
    case EDIT_ITEM_START:
      return { ...state };
    case DELETE_ITEM_START:
      return { ...state };
    default:
      return state;
  }

}
