import { factorizeUserItem, UserItem } from '../user-item.model';
import {
  ADD_USER_ITEM,
  DELETE_USER_ITEM,
  EDIT_USER_ITEM,
  ItemActions,
  SET_USER_ITEM_LIST,
  SETUP_ID
} from './item.actions';

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

      //@todo how to do it better - without mutating newItemList (just manipulating ...)
      const indexOfEditedItem = state.itemList.findIndex((userItem: UserItem) => {
        return userItem.id == action.payload.id
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
      const itemIndexWithIdToBeSetup = itemList.findIndex((userItem: UserItem) => {
        return userItem.id === action.payload.tempId;
      });

      //@todo how to do it better - without mutating itemList (just manipulating ...)
      itemList[itemIndexWithIdToBeSetup].id = action.payload.id;

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
