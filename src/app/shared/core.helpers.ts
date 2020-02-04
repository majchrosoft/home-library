export function castUndefinedToNull(varik: any) {

  if (typeof varik == 'undefined') {
    return null;
  }

  return varik;

}
