import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DynamicFormComponent,
  FieldConfig,
  FormDialog,
} from '@tanglass-erp/material';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { regConfigDraftInfos } from '@TanglassUi/sales/utils/forms';
import * as SalePointSelectors from '@TanglassStore/management/lib/selectors/sale-point.selectors';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-pop-quotation-transfer',
  templateUrl: './pop-quotation-transfer.component.html',
  styleUrls: ['./pop-quotation-transfer.component.scss'],
})
export class PopQuotationTransferComponent
  extends FormDialog
  implements OnInit {
  title = 'Données pour le tranfert';
  @ViewChild('transfer_form', { read: DynamicFormComponent })
  transferFormComponent: DynamicFormComponent;
  get transferForm() {
    return this.transferFormComponent?.form;
  }
  regConfig: FieldConfig[];
  customer$ = this.store.select(CustomerSelectors.getAllCustomers);
  contacts$ = this.store.select(ContactSelectors.getAllContacts);
  listCompanies$ = this.facade.allShortCompany$.pipe(
    map((item) =>
      item.map((company) => ({ key: company.id, value: company.name }))
    )
  );

  listSalesPoints$;

  constructor(
    public dialogRef: MatDialogRef<PopQuotationTransferComponent>,
    private facade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private authFacadeService: AuthFacadeService,
    private sharedFacade: SharedFacade
  ) {
    super(dialogRef, data);
  }
  ngOnInit(): void {
    this.authFacadeService.currentUser$.subscribe((user) => {
      this.listSalesPoints$ = this.sharedFacade
        .getSalesPointAsPerUserRole(user)
        .pipe(
          map((item) => item.map((POS) => ({ key: POS.id, value: POS.name })))
        );
    });
    this.buildForm();

  }
  submitForm() {
    this.submit(this.transferForm.value);
  }
  buildForm() {
    if (this.data?.id) {
      this.title = 'Éditer accessoire';
    }
    this.facade.loadAllShortCompanies();
    this.regConfig = regConfigDraftInfos(
      [],
      this.customer$,
      this.contacts$,
      this.listCompanies$,
      this.listSalesPoints$
    );
  }
}
