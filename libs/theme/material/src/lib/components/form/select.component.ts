import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { Observable } from 'rxjs';
import { REQUIRED } from '../../../helpers/validators';

@Component({
  selector: "app-select",
  template: `
<mat-form-field style="width: 100%" class="demo-full-width margin-top" [formGroup]="group" [hintLabel]="field.hint">
<mat-select [multiple]="field.multiple" [placeholder]="field.label" [formControlName]="field.name" [required]='field?.validations?.includes(REQUIRED)'>
 <mat-option style="color: var(--color-warn)">None</mat-option>
<mat-option *ngFor="let item of field.options" [value]="item.key">{{item.value}}</mat-option>
</mat-select>
</mat-form-field>
`,
  styles: [],
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  REQUIRED = REQUIRED;

  constructor() {
  }
  ngOnInit() {
    if (this.field.options instanceof Observable) {
      this.field.options.subscribe(value => this.field.options = value);
    }
  }
}
