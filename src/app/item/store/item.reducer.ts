import { factorizeUserItem, UserItem } from '../user-item.model';
import { ADD_USER_ITEM, DELETE_USER_ITEM, EDIT_USER_ITEM, ItemActions, SET_USER_ITEM_LIST } from './item.actions';
import { userDataStorageService } from '../../auth/user-data-storage-service';
import { Item } from '../item.vo';

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
          factorizeUserItem(action.payload)
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
    case EDIT_USER_ITEM:
      return { ...state };
    case DELETE_USER_ITEM:
      return { ...state };
    default:
      return state;
  }

}
