import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { REQUIRED } from '../../../helpers/validators';

@Component({
  selector: "app-input",
  template: `
<mat-form-field style="width: 100%" [formGroup]="group" [hintLabel]="field.hint">
  <mat-label>{{field.label}}</mat-label>
  <input matInput [formControlName]="field.name" [type]="field.inputType" [required]='field?.validations?.includes(REQUIRED)'>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
<!--  <mat-hint *ngIf="!!field.hint">{{field.hint}}</mat-hint>-->
</mat-form-field>
`,
  styles: [],
})
export class InputComponent {
  field: FieldConfig;
  REQUIRED = REQUIRED;
  group: FormGroup;
  constructor() {}
}
