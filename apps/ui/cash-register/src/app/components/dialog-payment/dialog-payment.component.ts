import { Component, Inject } from '@angular/core';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsertedPayment } from '@tanglass-erp/core/cash-register';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { regConfigPayment } from '@TanglassUi/cash-register/utils/forms';
import { map } from 'rxjs/operators';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';

@Component({
  selector: 'ngx-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent extends FormDialog {
  title = "Payement";

  customers$ = this.store.select(CustomerSelectors.getAllCustomers);
  orders$ = this.facade.allOrdersSalepoint$;
  listCompanies$ = this.facade.allShortCompany$
    .pipe(map(item => item.map(company => ({ key: company.id, value: company.name })))
    );

  constructor(
    public dialogRef: MatDialogRef<DialogPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      payment: InsertedPayment,
      salepoint: string
    },
    private facade: SharedFacade,
    private store: Store<AppState>,
  ) {
    super(dialogRef, data);
  }

  regConfig: FieldConfig[];

  buildForm(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
    this.facade.loadAllShortCompanies();
    this.facade.loadAllOrdersSalepoint(this.data.salepoint);
    this.regConfig = regConfigPayment(this.data.payment, this.orders$, this.customers$, this.listCompanies$);
  }


  submit(value) {
    super.submit({
      ...this.data.payment,
      ...value
    })
  }

}
