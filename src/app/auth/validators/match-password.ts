import { Validator, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class MatchPassword implements Validator {
    validate(formGroup: FormGroup): ValidationErrors {
        const { password, passwordConfirmation } = formGroup.value;
        if (password === passwordConfirmation) {
            return null;
        } else {
            return { passwordDontMatch: true };
        }
    }
   
}
