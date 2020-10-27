import { UserItem } from '../user-item.model';

export interface UserItemServiceRepository {
  add(userItem: UserItem);

  remove(id: string);

  ofId(id: string);

  all();
}
