import { Params } from '@angular/router';
import { isNull } from 'util';

export function mapToId(idKey: string | null = null) {
  if (isNull(idKey)) {
    idKey = 'id';
  }
  return (params: Params): string | null => {
    return params.hasOwnProperty(idKey) ? params[idKey] : null;
  }
}
