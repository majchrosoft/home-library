import { userDataStorageService } from '../../infrastructure/persistance/local-storage/local-storage-user-data-repository';
import { generateIdentifier } from '../../core/helper/string/generateIdentifier';

export class Bookcase {

  public id: string;
  public name: string;
  public userId: string;

  constructor(
    id: string,
    name: string,
    userId: string
  ) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

}

export function factorizeBookcase(
  name: string,
  id: string | null = null
) {
  return new Bookcase(
    generateIdentifier(id),
    name,
    userDataStorageService.get().id,
  )
}
