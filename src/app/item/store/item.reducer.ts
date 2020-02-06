import { Item } from '../item.model';
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ItemActions, SET_ITEM_LIST } from './item.actions';
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
    case ADD_ITEM:
      return {
        ...state,
        itemList: [...state.itemList, {
          id: uuid(),
          ...action.payload
        }]
      };
    case SET_ITEM_LIST:
      return {
        ...state,
        itemList: [
          ...state.itemList,
          ...action.payload
        ]
      };
    case EDIT_ITEM:
      return { ...state };
    case DELETE_ITEM:
      return { ...state };
    default:
      return state;
  }

}
