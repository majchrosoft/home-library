import { BookcaseRepository } from '../../../app/bookcase/service/bookcase-repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookcaseUriBuilder } from './uri-builder/bookcase-uri-builder';
import { Bookcase } from '../../../app/bookcase/bookcase.model';
import { objectToArrayMapper } from '../../../core/helper/array/mapper/objectToArrayMapper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpBookcaseRepository implements BookcaseRepository {

  constructor(
    private http: HttpClient,
    private bookcaseUriBuilder: BookcaseUriBuilder
  ) {
  }

  add(bookcase: Bookcase) {
    return this.http.post(
      this.bookcaseUriBuilder
        .build(),
      bookcase
    )
  }

  all() {
    return this.http.get<Bookcase[]>(
      this.bookcaseUriBuilder.build()
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
