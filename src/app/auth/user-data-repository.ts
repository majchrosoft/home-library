import { User } from './user-model';

export interface UserDataRepository {

  set(user: User): void;

  get(): User;

  removeUser(): void

}

