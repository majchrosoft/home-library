import { UserItem } from '../../../app/item/user-item.model';

export function indexOfProperty<T, M>(list: T[], propertyName: string, property: M) {
  return list.findIndex((item: T) => {
    return item[propertyName] === property;
  });
}

export function ofProperty<T, M>(list: T[], propertyName: string, property: M) {
  return list[indexOfProperty(list, propertyName, property)];
}
