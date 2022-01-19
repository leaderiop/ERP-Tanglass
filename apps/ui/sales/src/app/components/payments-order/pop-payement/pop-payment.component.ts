import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigPayment } from '@TanglassUi/sales/utils/forms';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';

@Component({
  selector: 'ngx-pop-payment',
  templateUrl: './pop-payment.component.html',
  styleUrls: ['./pop-payment.component.scss'],
})
export class PopPaymentComponent extends FormDialog {
  title = "Ajouter un Réglement";
  regConfig: FieldConfig[];
  listCompanies = this.facade.allShortCompany$
    .pipe(map(item => item.map(company => ({ key: company.id, value: company.name })))
    );
  customers$ = this.store.select(CustomerSelectors.getAllCustomers);

  constructor(
    public dialogRef: MatDialogRef<PopPaymentComponent>,
    private facade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    if (this.data?.id) {
      this.title = "Éditer Paiement";
    }
    this.store.dispatch(CustomerActions.loadCustomers());
    this.facade.loadAllShortCompanies();
    this.regConfig = regConfigPayment(this.data,this.customers$, this.listCompanies);
  }


}
