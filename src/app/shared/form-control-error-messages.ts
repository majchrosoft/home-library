import { AbstractControl, FormGroup } from '@angular/forms';
import { isObject } from 'util';
import { globalValidatorErrorMessages } from './globalValidatorErrorMessages';
import { throwError } from 'rxjs';
import * as _ from 'lodash';
import { FormDefinition } from './FormDefinition';

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
      if (
        !formDefinition.validatorErrorMessages().hasOwnProperty(formControlName)
        &&
        !formDefinition.validatorErrorMessages()[formControlName].hasOwnProperty(errorKey)
        &&
        !globalValidatorErrorMessages.hasOwnProperty(errorKey)
      ) {
        throwError('definition of validation message for errorKey ' + errorKey + ' missing');
      }

      return formDefinition.validatorErrorMessages()[formControlName][errorKey] ||
        globalValidatorErrorMessages[errorKey];

    })();
  });


}
