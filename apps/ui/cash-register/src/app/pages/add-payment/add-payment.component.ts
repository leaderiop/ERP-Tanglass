import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Column, DynamicFormComponent, FieldConfig, PageForm, TableComponent } from '@tanglass-erp/material';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import { regConfigPayment_ } from '@TanglassUi/cash-register/utils/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomerStatusHeaders, OrderHeaders } from '@TanglassUi/cash-register/utils/grid-headers';
import { OrderDeliveryStatus, OrderPaymentStatus, Order } from '@tanglass-erp/core/sales';
import { CashBoxFacade } from '@tanglass-erp/store/cash-register';
import { arrInnerJoin } from '@tanglass-erp/core/common';

@Component({
  selector: 'ngx-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent extends PageForm implements AfterViewInit  {
  @ViewChild('form') formComponent: DynamicFormComponent;
  @ViewChild('customerSituationTable') customerSituationTable: TableComponent<any>;
  // Observables
  customers$ = this.store.select(CustomerSelectors.getAllCustomers);
  customerSituation$ = this.cashBoxFacade.customerSituation$;
  listCompanies$ = this.sharedFacade.allShortCompany$
    .pipe(map(item => item.map(company => ({ key: company.id, value: company.name })))
    );
  orders$ = this.sharedFacade.getAllClientOrders$;

  // Columns && Forms
  regConfig: FieldConfig[];
  ordersColumns: Array<Column> = OrderHeaders;
  customerSituationColumns: Array<Column> = CustomerStatusHeaders;
  data: any;

  orders: Order[] = [];

  // Chips Color
  chipDeliveryColors = {
    [OrderDeliveryStatus.DELIVERED]: "green-500",
    [OrderDeliveryStatus.PARTIAL_DELIVERED]: "light-blue-300",
    [OrderDeliveryStatus.NOT_DELIVERED]: "red-400"
  }

  chipPaymentStatus = {
    [OrderPaymentStatus.PAID]: "green-500",
    [OrderPaymentStatus.PARTIALLY]: "light-blue-300",
    [OrderPaymentStatus.UNPAID]: "red-400"
  }

  canPay = false

  constructor(
    private sharedFacade: SharedFacade,
    private cashBoxFacade: CashBoxFacade,
    private store: Store<AppState>,
    protected activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute);
    this.buildForm();
  }

  ngAfterViewInit(): void {
        this.formComponent.form.get('customer_id')
          .valueChanges.subscribe(value => {
            this.canPay = this.payableOrders();
            this.sharedFacade.loadClientOrders(value);
            this.cashBoxFacade.getCustomerSituation(value);
        });
    }

  dispatchActions(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
    this.sharedFacade.loadAllShortCompanies();
  }

  buildForm(): void {
    this.regConfig = regConfigPayment_({}, this.customers$, this.listCompanies$);
  }

  selectOrders(orders: Array<Order>) {
      this.orders=orders.filter(e => e.payment_status !== OrderPaymentStatus.PAID);
      this.canPay = this.payableOrders();
  }

  payableOrders() {
    return this.orders.length>0;
  }

  submit(value: any) {
    const orders = arrInnerJoin(
      this.customerSituationTable.data,
      this.orders,
      'order_ref',
      'ref'
      )
    this.cashBoxFacade.addPayments(value, orders);
  }


}
