import { UserDataRepository } from '../../../app/auth/user-data-repository';
import { Injectable } from '@angular/core';
import { User } from '../../../app/auth/user-model';

const userDataLocalStorageKey = 'userData';

export class UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserDataRepository implements UserDataRepository {

  set(user: User) {
    localStorage.setItem(userDataLocalStorageKey, JSON.stringify(user));
  }

  get(): User {
    const userData = <UserData> JSON.parse(localStorage.getItem(userDataLocalStorageKey));

    if (!userData) {
      return null;
    }

    return new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
  }

  removeUser(): void {
    localStorage.removeItem('userData');
  }

}

export const userDataStorageService = new LocalStorageUserDataRepository();

