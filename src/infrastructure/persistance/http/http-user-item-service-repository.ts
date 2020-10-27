import { UserItemServiceRepository } from '../../../app/item/user-item-service/user-item-service.repository';
import { UserItem } from '../../../app/item/user-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserItemUriBuilder } from './uri-builder/user-item-uri-builder';
import { objectToArrayMapper } from '../../../core/helper/array/mapper/objectToArrayMapper';


@Injectable({
  providedIn: 'root'
})
export class HttpUserItemServiceRepository implements UserItemServiceRepository {


  constructor(
    private http: HttpClient
  ) {
  }

  add(userItem: UserItem) {
    return this.http.put(
      UserItemUriBuilder.aNewUri()
        .of(userItem.id)
        .build(),
      userItem
    );
  }

  update(userItem: UserItem) {
    return this.http.put(
      //create test
      UserItemUriBuilder.aNewUri().of(userItem.id).build(),
      // 'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.get().id  + '/items/' + userItem.id + '.json',
      {
        ...userItem
      }
    )
  }

  all() {
    return this.http.get<UserItem[]>(
      UserItemUriBuilder.aNewUri().build()
    )
      .pipe(
        map(objectToArrayMapper)
      )
      ;
  }

  ofId(id: string) {
  }

  remove(id: string) {
    return this.http.delete(
      UserItemUriBuilder.aNewUri().of(id).build()
    );
  }

}
