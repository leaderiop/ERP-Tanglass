import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  DraftFacade,
  OrdersFacade,
  ProductDraftFacade,
} from '@tanglass-erp/store/sales';
import { DynamicFormComponent, FieldConfig } from '@tanglass-erp/material';
import * as ShortCompanieSelectors from '@TanglassStore/shared/lib/+state/company/short-company.selectors';
import { regConfigDraftInfos } from '@TanglassUi/sales/utils/forms';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { debounceTime, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import * as SalePointSelectors from '@TanglassStore/management/lib/selectors/sale-point.selectors';
import { Router } from '@angular/router';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit, OnDestroy, AfterViewInit {
  //orderPayments$ = this.paymentFacade.orderPayments$;

  regConfig: FieldConfig[];
  companies$ = this.store
    .select(ShortCompanieSelectors.getAllShortCompany)
    .pipe(
      map((item) =>
        item.map((company) => ({ key: company.id, value: company.name }))
      )
    );
  customer$ = this.store.select(CustomerSelectors.getAllCustomers);
  contacts$ = this.store.select(ContactSelectors.getAllContacts);
  salePoint$;
  currentUser;
  dataSub: Subscription;
  draft_id;
  data;
  @ViewChild('order_form', { read: DynamicFormComponent })
  orderFormComponent: DynamicFormComponent;
  get orderForm() {
    return this.orderFormComponent?.form;
  }
  constructor(
    private ordersFacade: OrdersFacade,
    private draftFacade: DraftFacade,
    private store: Store,
    private productDraftFacade: ProductDraftFacade,
    private router: Router,
    private sharedFacade: SharedFacade,
    private authFacadeService: AuthFacadeService
  ) {}
  buildForm(): void {
    this.regConfig = regConfigDraftInfos(
      this.data,
      this.customer$,
      this.contacts$,
      this.companies$,
      this.salePoint$
    );
  }
  ngOnInit(): void {
    this.authFacadeService.currentUser$.subscribe((user) => {
      this.salePoint$ = this.sharedFacade
        .getSalesPointAsPerUserRole(user)
        .pipe(
          map((item) => item.map((POS) => ({ key: POS.id, value: POS.name })))
        );
    });
    this.buildForm();
    this.dataSub = this.draftFacade.selectedDraftId$
      .pipe(debounceTime(500))
      .subscribe((id) => (this.draft_id = id));
  }
  ngAfterViewInit() {
    this.orderForm?.get('customer_id')?.valueChanges?.subscribe((val) => {
      this.customer$.subscribe((customers) => {
        let customer = customers.find((customer) => customer.id == val);
        // this.regConfig = regConfigDraftInfos(
        //   this.data,
        //   this.customer$,
        //   customer.contacts,
        //   this.companies$,
        //   this.salePoint$,
        // );
      });
    });
  }

  save() {
    this.productDraftFacade.amounts$
      .subscribe((amounts) => {
        let total = amounts.pop();
        this.ordersFacade.addOrder({
          ...this.orderForm.value,
          draft_id: this.draft_id,
          total_ttc: total.total_ttc,
          total_tax: total.total_tax,
          total_ht: total.total_ht,
          amounts: amounts.map((amount) => ({
            ...amount,
            company_name: amount.company_name,
            draft_id: this.draft_id,
          })),
        });
      })
      .unsubscribe();
  }

  cancel() {
    this.router.navigate(['/sales/order']);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
