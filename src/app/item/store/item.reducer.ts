import { UserItem } from '../user-item.model';
import {
  ADD_USER_ITEM,
  DELETE_USER_ITEM,
  EDIT_USER_ITEM,
  ITEM_ACTION_BORROW, ITEM_ACTION_GIVE_BACK_BORROWED,
  ItemActions,
  SET_USER_ITEM_LIST,
} from './item.actions';
import { indexOfProperty } from '../../../core/helper/array/ofProperty';

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
    case ITEM_ACTION_BORROW:
    case ITEM_ACTION_GIVE_BACK_BORROWED:
      const indexOfEditedItem = indexOfProperty<UserItem, string>(state.itemList, 'id', action.payload.id);
      const userItem: UserItem = action.payload;
      const newItemList = [...state.itemList];
      newItemList[indexOfEditedItem] = userItem;

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
    case DELETE_USER_ITEM:
      return {
        ...state,
        itemList:
          state.itemList.filter(function(userItem: UserItem) {
            return userItem.id !== action.payload;
          })
      }
    default:
      return state;
  }

}
