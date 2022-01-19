import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { Groupfield } from '../../interfaces/groupfield.interface';

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
  <form fxFlexFill="" style="min-width: 100%;width: 100%" [formGroup]="form" (submit)="onSubmit($event)">
    <ng-container *ngIf="!flat; else flatGroups">
    <div *ngFor="let g of groups">
        <div mat-subheader *ngIf="g.headerVisible" fxLayout="row" fxLayoutGap="16px"
             fxLayoutAlign="space-between center" class="mat-h3 p-16">
          <span fxFlex="" class="text-nowrap font-weight-bold">{{g.label}}</span>
          <mat-divider fxFlex="100"></mat-divider>
        </div>
        <div class="pl-28" fxFlexFill="" fxLayoutGap="20px grid" fxLayout="row wrap" fxLayoutAlign="space-between center">
          <ng-container *ngFor="let field of g.fields;" dynamicField [field]="field" [group]="form.controls[g.name]">
          </ng-container>
        </div>
    </div>
    </ng-container>

    <ng-template #flatGroups>
      <div class="pl-20" fxLayoutGap="20px grid" fxFlexFill="" fxLayout="row wrap" fxLayoutAlign="space-between center">
        <ng-container *ngFor="let g of groups">
          <ng-container *ngFor="let field of g.fields;" dynamicField [field]="field" [group]="form.controls[g.name]">
          </ng-container>
        </ng-container>
      </div>
    </ng-template>

  <div *ngIf="fields.length" class="pl-20" fxLayoutGap="20px grid" fxFlexFill="" fxLayout="row wrap" fxLayoutAlign="space-between center">
    <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
    </ng-container>
  </div>

    <ng-content></ng-content>

    <div *ngIf="withActions" class="mt-12"  fxLayout="row" fxLayoutAlign="center center"  mat-dialog-actions>
      <button matTooltip="Confirmer" class='mr-12' mat-raised-button color="primary" type="submit">Confirmer</button>
      <button matTooltip="Annuler" mat-raised-button color="warn" type="button" (click)="close.emit()">Annuler</button>
    </div>
  </form>
  `,
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() fields: FieldConfig[] = [];
  @Input() groups: Groupfield[] = [];
  @Input() validators;
  @Input() withActions: boolean = true;
  @Input() flat: boolean = false;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.form = this.createControl(this.fields);
    this.form.setValidators(this.validators);
    this.groups.forEach(group => {
      this.form.addControl(group.name, this.createControl(group.fields));
    });
  }
  ngOnChanges() {

  }
  /***
   *
   * @param name of the field
   * @param new parameters of the field
   */
  remakeField(name: string, { ...params }) {
    const index = this.fields.findIndex((item) => item.name === name);
    const newField = Object.assign({}, this.fields[index]);
    for (const [key, value] of Object.entries(params)) {
      newField[key] = value;
    }
    this.fields[index] = newField;
  }

  /***
   *
   * @param paths: list of strings
   * @return: AbstractControl
   * @purpose: Accessing controls and nested controls
   */
  getField(...paths: string[]): AbstractControl {
    const path = paths.join('.');
    return this.form.get(path);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
      for (const group of this.groups) {
        this.validateAllFormFields(<FormGroup>this.form.get(group.name));
      }
    }
  }

  createControl(fields) {
    const group = this.fb.group({});
    fields.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      if (field?.disabled) control.disable();
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
