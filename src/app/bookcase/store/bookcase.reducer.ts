import { Bookcase } from '../bookcase.model';
import {
  BOOKCASE_ADD,
  BOOKCASE_DELETE,
  BOOKCASE_EDIT,
  BOOKCASE_SET_LIST,
  BookcaseActions
} from './bookcase.actions';
import { indexOfProperty } from '../../../core/helper/array/ofProperty';

export interface BookcaseState {
  bookcaseList: Bookcase[];
  editedBookcase: Bookcase | null,
  editedBookcaseId: string | null
}


const initialState: BookcaseState = {
  bookcaseList: [],
  editedBookcase: null,
  editedBookcaseId: null
};

export function bookcaseReducer(
  state: BookcaseState = initialState,
  action: BookcaseActions
) {
  switch (action.type) {
    case BOOKCASE_ADD:
      return {
        ...state,
        bookcaseList: [
          ...state.bookcaseList,
          action.payload
        ]
      }
    case BOOKCASE_EDIT:
      //@todo how to do it better - without mutating newItemList (just manipulating ...)
      const indexOfEditedBookcase = state.bookcaseList.findIndex((bookcase: Bookcase
      ) => {
        return bookcase.id == action.payload.id
      });

      const newBookcaseList = [...state.bookcaseList];
      newBookcaseList[indexOfEditedBookcase] = action.payload;

      return {
        ...state,
        bookcaseList: [
          ...newBookcaseList
        ]
      }
    case BOOKCASE_SET_LIST:
      return {
        ...state,
        bookcaseList: [
          ...state.bookcaseList,
          ...action.payload
        ]
      }
    case BOOKCASE_DELETE:
      return { ...state };
    default:
      return state;
  }
}
