import { isNull } from 'util';

export function nullCoalesce(val: string | null): string {
  return isNull(val) ? '' : val;
}
