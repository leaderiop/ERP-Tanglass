import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';
import * as CashBoxSelectors from './cash-box.selectors';
import * as CashBoxActions from './cash-box.actions';
import * as CustomerSituationActions from '../customer-situation/customer-situation.actions';
import * as CustomerSituationSelectors from '../customer-situation/customer-situation.selectors';
import { InsertedCashBox, InsertedPayment } from '@tanglass-erp/core/cash-register';
import { filter, switchMap } from 'rxjs/operators';

@Injectable()
export class CashBoxFacade {
  loaded$ = this.store.pipe(select(CashBoxSelectors.getSalePointsLoaded));
  customerSituation$ = this.store.pipe(select(CustomerSituationSelectors.getAllCustomerSituation));
  allAllSalePoints$ = this.loaded$.pipe(
    filter((e) => !!e),
    switchMap(() => this.store.pipe(select(CashBoxSelectors.getAllSalePoints)))
  );
  selectedCashBox$ = this.store.pipe(
    select(CashBoxSelectors.getSelectedCashBox),
    filter((value) => !!value)
  );

  constructor(
    private store: Store,
  ) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAllSalePoints() {
    this.dispatch(CashBoxActions.loadCashBoxSalePoints());
  }

  loadCashBoxById(id: number, salepoint_id: string) {
    this.dispatch(CashBoxActions.loadCashBox({ id, salepoint_id }));
  }

  addCashBox(cashBox: InsertedCashBox) {
    this.dispatch(CashBoxActions.addCashBox({ cashBox }));
  }

  addPayment(payment: InsertedPayment) {
    this.dispatch(CashBoxActions.addPayment({ payment }));
  }

  addPayments(payment: Partial<InsertedPayment>, orders: Array<any>) {
    let amount = payment.amount;
    orders.sort((a, b) => a.total_ttc - b.total_ttc);
    let cond: boolean;
    for (const order of orders) {
        cond = amount <= order.credit;
        this.dispatch(
          CashBoxActions.addPayment(
            {
              payment: {
                ...payment,
                order_id: order.id,
                amount: cond?amount:order.total_ttc
              } as InsertedPayment
            }
          )
        );
        if (cond)
          break;
        else
          amount -= order.total_ttc
    }
  }

  getCustomerSituation(customer_id: string) {
    this.dispatch(CustomerSituationActions.loadCustomerSituation({ customer_id }));
  }
}
