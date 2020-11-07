import { UserItem } from '../../../app/item/user-item.model';

export function indexOfProperty<T, M>(list: T[], propertyName: string, property: M) {
  return list.findIndex((item: T) => {
    if (!item) {
      return -1;
    }
    return item[propertyName] === property;
  });
}

export function ofProperty<T, M>(list: T[], propertyName: string, property: M) {
  const indexik = indexOfProperty(list, propertyName, property);
  if (indexik === -1) {
    return null
  }
  return list[indexik];
}
