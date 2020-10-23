import { userDataStorageService } from '../../infrastructure/persistance/local-storage/local-storage-user-data-repository';

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
  id: string,
  name: string
) {
  return new Bookcase(
    id,
    name,
    userDataStorageService.get().id,
  )
}
