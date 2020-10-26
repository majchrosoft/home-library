/**
 * @todo anti-pattern model
 * public properties in model it's stateful anti-pattern, but redux approach and copying by ...
 * is common known approach from basic usage of redux.
 * welcome to weired world of javascript technologies.
 *
 * It's quite obvious that code shouldn't be fixed to concrete technology, but as beginner i don't know how to that better
 * making writing code as fast as in common approach (using ... operator)
 */
import { Item } from './item-vo';
import * as uuid from 'uuid/v4';
import { userDataStorageService } from '../../infrastructure/persistance/local-storage/local-storage-user-data-repository';
import * as _ from 'lodash';
import { generateIdentifier } from '../../core/helper/string/generateIdentifier';

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
  item: Item,
  idArg: string = null
) {
  return new UserItem(
    generateIdentifier(idArg),
    userDataStorageService.get().id,
    item,
  );

}

