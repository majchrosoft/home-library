import { isNull } from 'util';

export function objectToArrayMapper<T>(itemsObjectArg: T[] | null): T[] {
  const itemsObject = isNull(itemsObjectArg) ? {} : itemsObjectArg;
  return Object.values(itemsObject);
}
