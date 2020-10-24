import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNull } from 'util';
import { Bookcase } from '../bookcase.model';
import { nullCoalesce } from '../../../core/helper/string/nullCoalesce';
import { FormDefinition } from '../../shared/FormDefinition';


interface formValues {
  name: string
}

const defaultValues: formValues = {
  name: ''
}

function controls(values: formValues) {
  return {
    name: new FormControl(values.name, Validators.required),
  };
}

export class BookcaseFormDefinition implements FormDefinition {
  private formGroup: FormGroup | null = null;

  public form(): FormGroup {
    if (isNull(this.formGroup)) {
      throw new Error('form called before initialized');
    }

    return this.formGroup;
  }

  public buildFormFromEntity(bookcase: Bookcase): BookcaseFormDefinition {
    let values: formValues = {
      name: nullCoalesce(bookcase.name)
    };
    this.formGroup = new FormGroup(controls(values));
    return this;
  }

  public buildFormFromDefaultValues(): BookcaseFormDefinition {
    if (isNull(this.formGroup)) {
      this.formGroup = new FormGroup(controls(defaultValues))
    }
    return this;
  }

  validatorErrorMessages() {
    return {};
  }

}
