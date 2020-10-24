import { BookcaseState } from './bookcase.reducer';
import { castUndefinedToNull } from '../../shared/core.helpers';
import { Bookcase } from '../bookcase.model';

export function bookcaseOfId(id: string | null) {
  return (bookcaseState: BookcaseState) => {
    return castUndefinedToNull(bookcaseState.bookcaseList.find(
      (bookcase: Bookcase) => {
        return bookcase.id === id;
      }))
  }
}
