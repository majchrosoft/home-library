import { AbstractUserUriBuilder } from './abstract-user-uri-builder';
import { resourceEnum } from './resource-enum';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookcaseUriBuilder extends AbstractUserUriBuilder {
  constructor() {
    super();
    this.push(resourceEnum.bookcases)
  }
}
