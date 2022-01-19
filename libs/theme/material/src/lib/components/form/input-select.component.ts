import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { REQUIRED } from '../../../helpers/validators';

@Component({
  selector: "app-input-select",
  template: `
<mat-form-field style="width: 100%" [formGroup]="group" [hintLabel]="field.hint">
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of field.options" [value]="option.key">
      {{option.value}}
    </mat-option>
  </mat-autocomplete>
  <mat-label>{{field.label}}</mat-label>
  <input matInput [matAutocomplete]="auto" [formControlName]="field.name" [type]="field.inputType" [required]='field?.validations?.includes(REQUIRED)'>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
`,
  styles: [],
})
export class InputSelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  REQUIRED = REQUIRED;

  constructor() {}
  ngOnInit() {}
}
