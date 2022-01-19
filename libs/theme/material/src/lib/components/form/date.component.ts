import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { REQUIRED } from '../../../helpers/validators';

@Component({
  selector: "app-date",
  template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group" [hintLabel]="field.hint">
<input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label" [required]='field?.validations?.includes(REQUIRED)'>
<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
<mat-datepicker #picker></mat-datepicker>
<mat-hint></mat-hint>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
`,
  styles: [],
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  REQUIRED = REQUIRED;

  constructor() {}
  ngOnInit() {}
}
