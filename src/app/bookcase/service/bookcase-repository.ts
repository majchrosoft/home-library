import { Bookcase } from '../bookcase.model';

export interface BookcaseRepository {
  add(bookcase: Bookcase);

  remove(id: string);

  ofId(id: string);

  all();
}
