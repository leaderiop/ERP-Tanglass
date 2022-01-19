import { AfterViewInit, Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent, FormDialog, Groupfield } from '@tanglass-erp/material';
import { regConfigServiceConfig, regParamForm } from '../../../utils/forms';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-pop-service-config',
  templateUrl: './pop-service-config.component.html',
  styleUrls: ['./pop-service-config.component.scss'],
})
export class PopServiceConfigComponent extends FormDialog implements AfterViewInit {
  title = "Ajouter une service";
  regConfig: Groupfield[];
  params = [];
  paramFormArray;
  @ViewChildren(DynamicFormComponent) dynamicForms: QueryList<DynamicFormComponent>;

  constructor(
    public dialogRef: MatDialogRef<PopServiceConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
    this.paramFormArray = new FormArray([]);
  }

  ngAfterViewInit(): void {
    this.dynamicForms.changes.subscribe(() => {
      const forms = this.dynamicForms
        .filter(component => component.name === 'param')
        .map((dynamicForm: DynamicFormComponent) => dynamicForm.form);
      while (this.paramFormArray.length) {
        this.paramFormArray.removeAt(0);
      }
      forms.forEach(form => this.paramFormArray.push(form));
    });
  }

  buildForm() {
    this.regConfig = regConfigServiceConfig(this.data);
  }

  newParam() {
    this.params.push(Object.assign([], regParamForm));
  }

  deleteParam(param) {
    this.params = this.params.filter(elem => elem !== param);
  }

  submit(value: any) {
    if (this.paramFormArray.valid) {
      const serviceForm = value.service;
      serviceForm.params = JSON.stringify(this.paramFormArray.value);
      this.dialogRef.close(serviceForm);
    } else {
      this.paramFormArray.controls.forEach(elem => {
        this.markFormGroupTouched(elem);
      });
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched({ onlySelf: true });

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
