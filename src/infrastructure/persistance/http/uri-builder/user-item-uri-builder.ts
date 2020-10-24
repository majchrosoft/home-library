import { resourceEnum } from './resource-enum';
import { AbstractUserUriBuilder } from './abstract-user-uri-builder';

export class UserItemUriBuilder extends AbstractUserUriBuilder {

  constructor() {
    super();
    this.push(resourceEnum.items);
  }

  public static aNewUri(): UserItemUriBuilder {
    return new UserItemUriBuilder();
  }

}
