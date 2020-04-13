
import { AbstractControl } from '@angular/forms';

export function PasswordValidation(control: AbstractControl) {
  if ( control.parent) {
    const  password = control.parent.get('password').value;
    const  confirmed = control.parent.get('password_confirmation').value;
    console.log( password, confirmed)
    if( password !== confirmed){
      control.parent.get('password_confirmation').setErrors({'password_confirmation': true})
      return  { password_confirmed: true };
    }  else {
      control.parent.get('password_confirmation').setErrors(null)
      control.parent.get('password').setErrors(null)
    }
  }
  return null
}
