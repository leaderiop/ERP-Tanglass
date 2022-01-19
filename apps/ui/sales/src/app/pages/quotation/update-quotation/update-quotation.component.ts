import { Component } from '@angular/core';
import { FieldConfig, PageForm } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import { regConfigDraftInfos } from '@TanglassUi/sales/utils/forms';
import { filter, map } from 'rxjs/operators';
import * as ShortCompanieSelectors from '@TanglassStore/shared/lib/+state/company/short-company.selectors';
import * as SalePointSelectors from '@TanglassStore/shared/lib/+state/salePoint/short-salePoint.selectors';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import { Store } from '@ngrx/store';
import { Quotation, QuotationFacade } from '@tanglass-erp/store/sales';
import { cloneDeep } from 'lodash';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';

@Component({
  selector: 'ngx-update-quotation',
  templateUrl: './update-quotation.component.html',
  styleUrls: ['./update-quotation.component.scss']
})
export class UpdateQuotationComponent extends PageForm {
  regConfig: FieldConfig[];
  data: Quotation;
  companies$ = this.store.select(ShortCompanieSelectors.getAllShortCompany);
  customer$ = this.store.select(CustomerSelectors.getAllCustomers);
  contacts$ = this.store.select(ContactSelectors.getAllContacts);

  salePoint$ = this.store.select(SalePointSelectors.getAllShortSalePoint);

  constructor(public activatedRoute: ActivatedRoute,
              private sharedFacade: SharedFacade,
              private store: Store,
              private quotationFacade: QuotationFacade) {
    super(activatedRoute);
  }

  dispatchActions(): void {
    this.store.dispatch(ContactActions.loadContacts())
    this.store.dispatch(CustomerActions.loadCustomers());
    this.sharedFacade.loadAllShortCompanies();
    this.sharedFacade.loadAllShortWarehouses();
    this.sharedFacade.loadAllShortSalePoint();
    this.quotationFacade.loadQuotationById(this.id);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.id) {
      this.quotationFacade.loadedQuotation$.
      subscribe(quotation => {
        this.data = <Quotation> cloneDeep(quotation)
        this.buildForm();
      });
    }
  }

  buildForm(): void {
    this.regConfig = regConfigDraftInfos(
      this.data,
      this.customer$,
      this.contacts$,
      this.companies$.pipe(map(item => item.map(company => ({ key: company.id, value: company.name })))),
      this.salePoint$.pipe(filter(e => !!e),map(item => item.map(salePoint =>
        ({ key: salePoint.id, value: salePoint.name }))))
    );
  }

  submit(value) {
    this.quotationFacade.updateQuotation({
      id: this.id,
      ...value
    })
  }

}
