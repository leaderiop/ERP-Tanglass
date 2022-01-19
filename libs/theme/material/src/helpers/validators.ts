import { FormGroup, Validators } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


/** Validators **/

const REQUIRED = {
  name: "required",
  validator: Validators.required,
  message: "Requis"
};
const MAXNUMBER = (limit) =>
  ({
    name: "max",
    validator: Validators.max(limit),
    message: `Max ${limit}`
  });
const MINNUMBER = (limit) =>
  ({
    name: "min",
    validator: Validators.min(limit),
    message: `Min ${limit}`
  });
const EMAIL = {
  name: "email",
  validator: Validators.email,
  message: "Email non valide"
};
const MINLENGTH = (length) => (
  {
    name: "minlength",
    validator: Validators.minLength(length),
    message: `Min ${length} caractères`
  }
);
const MAXLENGTH = (length) => (
  {
    name: "maxlength",
    validator: Validators.maxLength(length),
    message: `Max ${length} caractères`
  }
);
const PASSWORD = [
  MINLENGTH(8),
  REQUIRED,
];


export {
  REQUIRED,
  MINNUMBER,
  MAXNUMBER,
  MINLENGTH,
  MAXLENGTH,
  EMAIL,
  PASSWORD
};
