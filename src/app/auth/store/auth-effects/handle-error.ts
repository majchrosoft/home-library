import { AuthenticateFail } from '../auth-actions';
import { of } from 'rxjs';


const enum errors {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWOR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

const knownErrorsHasMap = new Map([
  [errors.EMAIL_EXISTS, 'email exists'],
  [errors.EMAIL_NOT_FOUND, 'email not found'],
  [errors.INVALID_PASSWORD, 'invalid password'],
  [errors.UNKNOWN, 'unkonwn error'],
]);


export const handleError = (errorRes: any) => {
  let errorMessage = 'Error occured. Retry Your action again later.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthenticateFail(errorMessage));
  }

  return knownErrorsHasMap.has(errorRes.error.error) ? knownErrorsHasMap.get(errorRes.error.error) : knownErrorsHasMap.get(errors.UNKNOWN);

}
