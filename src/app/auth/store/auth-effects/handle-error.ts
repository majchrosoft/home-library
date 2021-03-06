import { AuthenticateFail } from '../auth-actions';
import { of } from 'rxjs';


const enum errors {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  UNKNOWN = 'UNKNOWN_ERROR',
}

const knownErrorsHashMap = new Map([
  [errors.EMAIL_EXISTS, 'email exists'],
  [errors.EMAIL_NOT_FOUND, 'email not found'],
  [errors.INVALID_PASSWORD, 'invalid password'],
  [errors.UNKNOWN, 'unknown error'],
]);


export const handleError = (errorRes: any) => {

  const errorMessage = (() => {
    if (
      !errorRes.error ||
      !errorRes.error.error ||
      !knownErrorsHashMap.has(errorRes.error.error.message)
    ) {
      return knownErrorsHashMap.get(errors.UNKNOWN);
    }
    return knownErrorsHashMap.get(errorRes.error.error.message);
  })();

  return of(new AuthenticateFail(errorMessage));
}
