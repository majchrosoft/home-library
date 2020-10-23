import { AbstractUriBuilder } from './abstract-uri-builder';
import { resourceEnum } from './resource-enum';
import { userDataStorageService } from '../../local-storage/local-storage-user-data-repository';

export class AbstractUserUriBuilder extends AbstractUriBuilder {

  protected constructor() {
    super();
    this.with(resourceEnum.users);
    this.of(userDataStorageService.get().id)
  }
  
}
