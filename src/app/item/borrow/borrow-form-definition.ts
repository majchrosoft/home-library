import { Borrow, factorizeEmptyBorrowed } from '../borrow-vo';
import { isNull } from 'util';
import { nullCoalesce } from '../../../core/helper/string/nullCoalesce';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export function factorizeBorrowFormGroupFromEntity(borrow: Borrow | null): FormGroup {
  return factorizeBorrowFormGroup(factorizeBorrowFormDefinition(borrow));
}

interface BorrowFormValues {
  expectedEndAt: number;
  borrowerEmail: string;
  borrowerName: string;
  borrowerData: string;
}

class BorrowFormDefinition implements BorrowFormValues {

  public expectedEndAt: number;
  public borrowerEmail: string;
  public borrowerName: string;
  public borrowerData: string;

  constructor(borrow: Borrow) {
    this.expectedEndAt = isNull(borrow.expectedEndAt) ? +Date.now() : borrow.expectedEndAt;
    this.borrowerEmail = nullCoalesce(borrow.borrowerEmail);
    this.borrowerName = nullCoalesce(borrow.borrowerName);
    this.borrowerData = nullCoalesce(borrow.borrowerData);
  }
}

function factorizeBorrowFormGroup(values: BorrowFormValues): FormGroup {
  return new FormGroup({
    expectedEndAt: new FormControl(new Date(values.expectedEndAt)),
    borrowerEmail: new FormControl(values.borrowerEmail, Validators.email),
    borrowerName: new FormControl(values.borrowerName),
    borrowerData: new FormControl(values.borrowerData),
  });
}

function factorizeBorrowFormDefinition(
  borrowArg: Borrow | null
): BorrowFormDefinition {
  const borrow = isNull(borrowArg) ? factorizeEmptyBorrowed(true) : borrowArg;
  return new BorrowFormDefinition(borrow);
}
