import { User } from './user-model';

const userDataLocalStorageKey = 'userData';

export class UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

class UserDataStorageService {

  setUser(user) {
    localStorage.setItem(userDataLocalStorageKey, JSON.stringify(user));
  }

  getUser(): UserData {
    return <UserData> JSON.parse(localStorage.getItem(userDataLocalStorageKey));
  }

  removeUser() {
    localStorage.removeItem('userData');
  }

}

export const userDataStorageService = new UserDataStorageService();

