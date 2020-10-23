import { Bookcase } from '../bookcase.model';

export interface BookcaseRepository {
  add(bookcase: Bookcase);

  remove(bookcase: Bookcase);

  ofId(id: string);

  all();
}
