import { Injectable } from '@angular/core';
import { GetCashBoxByIdGQL, InsertCashBoxGQL, InsertPaymentGQL, GetCustomerSituationGQL } from '@tanglass-erp/infrastructure/graphql';
import { InsertedCashBox, InsertedPayment } from '../models/cash-box';

@Injectable({
  providedIn: 'root'
})
export class CashBoxService {

  constructor(
    private getCashBoxByIdGQL: GetCashBoxByIdGQL,
    private insertCashBoxGQL: InsertCashBoxGQL,
    private insertPaymentGQL: InsertPaymentGQL,
    private getCustomerSituationGQL: GetCustomerSituationGQL
  ) { }

  getCashBoxById(id: number, salepoint_id: string) {
    return this.getCashBoxByIdGQL.fetch({id, salepoint_id});
  }

  insertCashBox(obj: InsertedCashBox) {
    return this.insertCashBoxGQL.mutate(obj);
  }

  insertPayment(obj: InsertedPayment) {
    return this.insertPaymentGQL.mutate(obj);
  }

  getCustomerSituation(customer_id: string) {
    return this.getCustomerSituationGQL.watch({customer_id}).valueChanges;
  }


}
