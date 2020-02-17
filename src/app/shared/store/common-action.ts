import { LoginOrSignUpStartPayload } from '../../auth/store/auth-actions';
import { Action } from '@ngrx/store';


export class CommonAction implements Action {
  type: string;

  constructor(
    public payload: any = null
  ) {
  }
}
