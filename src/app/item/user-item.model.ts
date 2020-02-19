/**
 * @todo anti-pattern model
 * public properties in model it's stateful anti-pattern, but redux approach and copying by ...
 * is common known approach from basic usage of redux.
 * welcome to weired world of javascript technologies.
 *
 * It's quite obvious that code shouldn't be fixed to concrete technology, but as beginner i don't know how to that better
 * making writing code as fast as in common approach (using ... operator)
 */
import { Item } from './item.vo';
import { userDataStorageService } from '../auth/user-data-storage-service';
import * as uuid from 'uuid/v4';

export class UserItem {
  public id: string;
  public userId: string;

  public item: Item;

  constructor(
    id: string,
    userId: string,
    item: Item
  ) {
    this.id = id;
    this.userId = userId;
    this.item = item;
  }


}

export function factorizeUserItem(
  item: Item
) {
  return new UserItem(
    uuid(),
    userDataStorageService.getUser().id,
    item,
  );

}

