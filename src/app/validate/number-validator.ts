import {FormControl} from '@angular/forms';

export class NumberValidator {

    static isValid(control: FormControl) {
        const re = /^([0-9]{6,12})$/.test(
          control.value
        );
        if (re) {
          return null;
        }
        return {
          invalidNumber: true
        };
      }
}
