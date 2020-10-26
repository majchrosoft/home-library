import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

export function generateIdentifier(idArg: string = null): string {
  if (_.isNull(idArg)) {
    return uuid()
  } else {
    return idArg;
  }
}
