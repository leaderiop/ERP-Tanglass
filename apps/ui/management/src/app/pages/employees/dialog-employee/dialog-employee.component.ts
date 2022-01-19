import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FieldConfig, FormDialog, MustMatch } from '@tanglass-erp/material';
import * as SalePointActions from '@TanglassStore/management/lib/actions/salePoint.actions';
import * as SalePointSelectors from '@TanglassStore/management/lib/selectors/sale-point.selectors';
import { regConfigEmployee } from '@TanglassUi/management/utils/forms';
import { map } from 'rxjs/operators';
import { environment as env } from '../../../../environments/environment';


@Component({
  selector: 'ngx-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss']
})
export class DialogEmployeeComponent extends FormDialog implements OnDestroy {
  title: string;
  regConfig: FieldConfig[];
  reConfigValidator = MustMatch('password', 'confirmPassword');
  salePoints$ = this.store.select(SalePointSelectors.getAllSalePoints)
    .pipe(map(e => e.map(item => ({key: item.id, value: item.name}))));

  constructor(public dialogRef: MatDialogRef<DialogEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.title = this.data?.id?env.UPDATE_USER_TITLE:env.ADD_USER_TITLE;
    this.store.dispatch(SalePointActions.loadSalePoints());
  }

  buildForm(): void {
    this.regConfig = regConfigEmployee(this.data, this.salePoints$);
  }


  submitForm(value) {
    const {confirmPassword, ...formValue} = value;
    this.submit(formValue);
  }
  ngOnDestroy(): void {
  }

}
