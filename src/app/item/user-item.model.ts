import { Item } from './item-vo';
import { userDataStorageService } from '../../infrastructure/persistance/local-storage/local-storage-user-data-repository';
import { generateIdentifier } from '../../core/helper/string/generateIdentifier';
import { Borrow, factorizeIsNotBorrowed } from './borrow-vo';
import { isNull } from 'util';

export class UserItem {
  public id: string;
  public userId: string;

  public item: Item;
  public borrow: Borrow;

  constructor(
    id: string,
    userId: string,
    item: Item,
    borrow: Borrow
  ) {
    this.borrow = borrow;
    this.id = id;
    this.userId = userId;
    this.item = item;
  }

}

export function factorizeUserItem(
  item: Item,
  borrowArg: Borrow | null = null,
  idArg: string = null
): UserItem {

  const borrow: Borrow = (function() {
    if (isNull(borrowArg)) {
      return factorizeIsNotBorrowed();
    }
    return borrowArg;
  })();

  return new UserItem(
    generateIdentifier(idArg),
    userDataStorageService.get().id,
    item,
    borrow
  );

}

