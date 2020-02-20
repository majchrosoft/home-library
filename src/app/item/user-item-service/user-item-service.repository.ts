import { UserItem } from '../user-item.model';

export interface UserItemServiceRepository {
  add(userItem: UserItem);

  remove(userItem: UserItem);

  ofId(id: string);

  all();
}
