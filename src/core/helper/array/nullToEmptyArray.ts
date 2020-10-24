import { isNull } from 'util';

export function nullToEmptyArray<T>(list: T[] | null) {
  return isNull(list) ? [] : list;
}
