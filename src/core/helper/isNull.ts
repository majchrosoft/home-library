export function isNull(variable: any): boolean {
  return variable === null || variable === undefined;
}

export function isObject(variable: any): boolean {
  return variable !== null && typeof variable === 'object';
}
