import { UserItemServiceRepository } from '../../../app/item/user-item-service/user-item-service.repository';
import { UserItem } from '../../../app/item/user-item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDataStorageService } from '../local-storage/local-storage-user-data-repository';
import { map, switchMap, tap } from 'rxjs/operators';
import { ResourcePostResponseBody } from './response/resource-post-response-body';
import { User } from '../../../app/auth/user-model';
import { isNull } from 'util';
import { UserItemUriBuilder } from './uri-builder/user-item-uri-builder';
import { objectToArrayMapper } from '../../../core/helper/array/mapper/objectToArrayMapper';


@Injectable({
  providedIn: 'root'
})
export class HttpUserItemServiceRepository implements UserItemServiceRepository {


  constructor(
    private http: HttpClient,
    private userItemUriBuilder: UserItemUriBuilder
  ) {
  }

  add(userItem: UserItem) {
    return this.http.post(
      this.userItemUriBuilder
        .build(),
      userItem
    );
  }

  update(userItem: UserItem) {
    return this.http.put(
      //create test
      this.userItemUriBuilder.of(userItem.id).build(),
      // 'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.get().id  + '/items/' + userItem.id + '.json',
      {
        ...userItem
      }
    )
  }

  all() {
    return this.http.get<UserItem[]>(
      this.userItemUriBuilder.build()
      // 'https://home-library-d13b5.firebaseio.com/users/' + userDataStorageService.get().id + '/items.json'
    )
      .pipe(
        map(objectToArrayMapper)
      )
      ;
  }

  ofId(id: string) {
  }

  remove(userItem: UserItem): void {
  }

}
