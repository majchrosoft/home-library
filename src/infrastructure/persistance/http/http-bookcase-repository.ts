import { BookcaseRepository } from '../../../app/bookcase/service/bookcase-repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookcaseUriBuilder } from './uri-builder/bookcase-uri-builder';
import { Bookcase } from '../../../app/bookcase/bookcase.model';
import { objectToArrayMapper } from '../../../core/helper/array/mapper/objectToArrayMapper';
import { map } from 'rxjs/operators';
import { UserItem } from '../../../app/item/user-item.model';
import { UserItemUriBuilder } from './uri-builder/user-item-uri-builder';

@Injectable({
  providedIn: 'root'
})
export class HttpBookcaseRepository implements BookcaseRepository {

  constructor(
    private http: HttpClient
  ) {
  }

  add(bookcase: Bookcase) {
    return this.http.put(
      BookcaseUriBuilder.aNewUri()
        .of(bookcase.id)
        .build(),
      bookcase
    )
  }

  update(bookcase: Bookcase) {
    return this.http.put(
      //create test
      BookcaseUriBuilder
        .aNewUri()
        .of(bookcase.id)
        .build(),
      {
        ...bookcase
      }
    )
  }

  all() {
    return this.http.get<Bookcase[]>(
      BookcaseUriBuilder.aNewUri().build()
    ).pipe(
      map(
        objectToArrayMapper
      )
    )
  }

  ofId(id: string) {
  }

  remove(bookcase: Bookcase): void {
  }

}
