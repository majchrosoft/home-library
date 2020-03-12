import { UserItemServiceRepository } from '../../../app/item/user-item-service/user-item-service.repository';
import { UserItem } from '../../../app/item/user-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDataStorageService } from '../local-storage/local-storage-user-data-repository';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpUserItemServiceRepository implements UserItemServiceRepository {

  constructor(
    private http: HttpClient
  ) {
  }

  add(userItem: UserItem) {
    return this.http.post(
      'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.get().id + '/items.json',
      userItem
    )
  }

  update(userItem: UserItem) {
    return this.http.put(
      'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.get().id + '/items.json',
      {
        ...userItem,
        userId: userDataStorageService.get().id
      }
    )
  }

  all() {
    return this.http.get<UserItem[]>(
      'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.get().id + '/items.json'
    ).pipe(
      map((itemsObject) => {
        return Object.values(itemsObject);
      })
    );
  }

  ofId(id: string) {
  }

  remove(userItem: UserItem): void {
  }

}
