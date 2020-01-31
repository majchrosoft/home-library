import { FormGroup } from '@angular/forms';

export interface FormDefinition {
  form(): FormGroup;

  validatorErrorMessages(): any;
}
