const userDataLocalStorageKey = 'userData';

export class UserDataStorageService {

  setUser(user) {
    localStorage.setItem(userDataLocalStorageKey, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(userDataLocalStorageKey));
  }

  removeUser() {
    localStorage.removeItem('userData');
  }

}
