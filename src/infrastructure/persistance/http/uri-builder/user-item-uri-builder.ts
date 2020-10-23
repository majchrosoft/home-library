import { Injectable } from '@angular/core';
import { resourceEnum } from './resource-enum';
import { AbstractUserUriBuilder } from './abstract-user-uri-builder';

@Injectable({
  providedIn: 'root'
})
export class UserItemUriBuilder extends AbstractUserUriBuilder {

  constructor() {
    super();
    this.push(resourceEnum.items);
  }


}
