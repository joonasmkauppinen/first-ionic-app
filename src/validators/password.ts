import { AbstractControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
  static isMatching(form: AbstractControl) {
    const pass = form.get('password');
    const confirmPass = form.get('confirmPassword');

    console.log('pass: ', pass.value);
    console.log('confirmPass: ', confirmPass.value);
    console.log('notMatching: ', confirmPass.value !== pass.value);

    if (confirmPass.value !== pass.value) {
      confirmPass.setErrors({ notMatching: true });
    } else {
      confirmPass.setErrors(null);
    }
  }
}
