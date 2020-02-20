import { UserItem } from '../user-item.model';

export interface UserItemServiceRepository {
  add(userItem: UserItem): void;

  remove(userItem: UserItem): void;

  ofId(id: string);

  all(): UserItem[];
}
