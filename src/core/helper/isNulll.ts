import { isNull } from 'util';

export function isNulll(variable): boolean {
  return variable === undefined || isNull(variable);
}
