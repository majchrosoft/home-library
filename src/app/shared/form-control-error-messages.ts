import { AbstractControl, FormGroup } from '@angular/forms';
import { isObject } from 'util';
import { globalValidatorErrorMessages } from './globalValidatorErrorMessages';
import { throwError } from 'rxjs';
import * as _ from 'lodash';
import { FormDefinition } from './FormDefinition';
import has = Reflect.has;

export function formControlErrorMessages(
  formDefinition: FormDefinition,
  formControlName: string
): string[] {
  let formControl: AbstractControl = formDefinition.form().get(formControlName);
  if (
    !formControl.touched
    ||
    !isObject(formControl.errors)
  ) {
    return [];
  }

  return _.keys(formControl.errors).map(function(errorKey) {

    return (() => {

      let formErrorMessages = formDefinition.validatorErrorMessages();

      let errorsFromFormErrorMessages =
        formErrorMessages.hasOwnProperty('formControlName') &&
        formErrorMessages[formControlName].hasOwnProperty(errorKey) &&
        formErrorMessages[formControlName][errorKey];

      if (!errorsFromFormErrorMessages) {
        return globalValidatorErrorMessages[errorKey];
      }

    })();
  });


}
