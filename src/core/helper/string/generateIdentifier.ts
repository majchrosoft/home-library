import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

export function generateIdentifier(idArg: string = null): string {
  if (_.isNull(idArg)) {
    return uuid()
  } else {
    return idArg;
  }
}
