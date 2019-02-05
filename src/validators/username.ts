import { Injectable } from '@angular/core';
import { AuthProvider } from '../providers/auth/auth';
import { FormControl } from '@angular/forms';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public auth: AuthProvider) {}

  checkUsername(control: FormControl) {
    console.log('constrol value: ', typeof control.value);

    if (control.value === '') return null;

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(_ => {
        this.auth.checkUsername(control.value).subscribe(
          res => {
            console.log(res);
            if (!res['available']) {
              resolve({ usernameInUse: true });
            } else {
              resolve(null);
            }
          },
          err => {
            resolve({ usernameCheckError: true });
          }
        );
      }, 200);
    });
  }
}
