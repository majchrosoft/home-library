import { UserItemServiceRepository } from '../../../app/item/user-item-service/user-item-service.repository';
import { UserItem } from '../../../app/item/user-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDataStorageService } from '../local-storage/local-storage-user-data-repository';

@Injectable({
  providedIn: 'root'
})
export class HttpUserItemServiceRepository implements UserItemServiceRepository {

  constructor(
    private http: HttpClient
  ) {
  }

  add(userItem: UserItem): void {
    return this.http.post(
      'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.getUser().id + '/items.json',
      userItem
    )
  }

  all(): UserItem[] {
    return this.http.get<UserItem[]>(
      'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.getUser().id + '/items.json'
    )
  }

  ofId(id: string) {
  }

  remove(userItem: UserItem): void {
  }

}
