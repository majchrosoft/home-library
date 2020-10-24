import { Bookcase } from '../bookcase.model';
import {
  BOOKCASE_ADD,
  BOOKCASE_DELETE,
  BOOKCASE_EDIT,
  BOOKCASE_SET_LIST,
  BOOKCASE_SETUP_ID,
  BookcaseActions
} from './bookcase.actions';

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
    case BOOKCASE_SETUP_ID:
      let bookcaseList = [...state.bookcaseList];
      const bookcaseIndexWithIdToBeSetup = bookcaseList.findIndex((bookcase: Bookcase) => {
        return bookcase.id === action.payload.tempId;
      })

      bookcaseList[bookcaseIndexWithIdToBeSetup].id = action.payload.id

      return {
        ...state,
        bookcaseList: [
          ...bookcaseList
        ]
      };
    case BOOKCASE_DELETE:
      return { ...state };
    default:
      return state;
  }
}
