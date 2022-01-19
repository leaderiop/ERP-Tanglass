import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromPayments from './payments.reducer';
import * as PaymentsSelectors from './payments.selectors';
import * as PaymentsActions from './payments.actions';
import { Payment } from '@tanglass-erp/core/sales';

@Injectable()
export class PaymentsFacade {
  loaded$ = this.store.pipe(select(PaymentsSelectors.getPaymentsLoaded));
  allPayments$ = this.store
    .pipe(select(PaymentsSelectors.getAllPayments))
    .pipe(
      map((data) =>
        data.map((element) => ({ ...element, company: element.company.name }))
      )
    );
  selectedPayment$ = this.store.pipe(
    select(PaymentsSelectors.getSelectedPayment)
  );
  orderPayments$ = this.store.pipe(
    select(PaymentsSelectors.getSelectedOrderPayments)
  );

  constructor(private store: Store<fromPayments.PaymentsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  // loadOrderPayments(order_id) {
  //   this.dispatch(PaymentsActions.loadOrderPayments({ order_id }));
  // }

  addPayment(payment: Payment) {
    this.dispatch(PaymentsActions.addPayment({ payment }));
  }
  groupBy(key: string, array): { [key: string]: Payment[] } {
    return array.reduce(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj),
      }),
      {}
    );
  }
  groupPaymentsByCompany() {
    return this.allPayments$.pipe(
      map((payments) => {
        let paymentsGroups = this.groupBy('company', payments);
        let result: Array<{ company: string; amount }> = [];
        for (let company of Object.keys(paymentsGroups)) {
          result.push({
            company: company,
            amount: paymentsGroups[company].reduce(
              (acc, val) => acc + val.amount,
              0
            ),
          });
        }
        result.push({
          company: 'Total',
          amount: result.reduce((acc, val) => acc + val.amount, 0),
        });
        return result;
      })
    );
  }
  setOrderPayments(payments: Payment[]) {
    this.dispatch(PaymentsActions.setOrderPayments({ payments }));
  }
}
