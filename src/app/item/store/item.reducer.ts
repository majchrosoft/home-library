import { factorizeUserItem, UserItem } from '../user-item.model';
import {
  ADD_USER_ITEM,
  DELETE_USER_ITEM,
  EDIT_USER_ITEM,
  ItemActions,
  SET_USER_ITEM_LIST,
  SETUP_ID
} from './item.actions';
import { User } from '../../auth/user-model';
import { act } from '@ngrx/effects';

export interface ItemState {
  itemList: UserItem[];
  editedItem: UserItem | null,
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
    case ADD_USER_ITEM:
      return {
        ...state,
        itemList: [
          ...state.itemList,
          action.payload
        ]
      };
    case EDIT_USER_ITEM:

      const indexOfEditedItem = state.itemList.findIndex((userItem: UserItem) => {
        return userItem.id = action.payload.id
      });

      const newItemList = [...state.itemList];
      newItemList[indexOfEditedItem] = action.payload;

      return {
        ...state,
        itemList: [
          ...newItemList
        ]
      };
    case SET_USER_ITEM_LIST:
      return {
        ...state,
        itemList: [
          ...state.itemList,
          ...action.payload
        ]
      };
    case SETUP_ID:
      let itemList = [...state.itemList];
      console.log('itemList', itemList);
      console.log('action.payload', action.payload);
      const itemIndexWithIdToBeSetup = itemList.findIndex((userItem: UserItem) => {
        return userItem.id === action.payload.tempId;
      });
      console.log('itemIndexWithIdToBeSetup', itemIndexWithIdToBeSetup);

      itemList[itemIndexWithIdToBeSetup].id = action.payload.id;

      console.log('itemList after update', itemList);

      return {
        ...state,
        itemList: [
          ...itemList
        ]
      };
    case DELETE_USER_ITEM:
      return { ...state };
    default:
      return state;
  }

}
