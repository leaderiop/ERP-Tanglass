import { Injectable } from '@angular/core';
import {
  DeleteDeliveryGQL,
  GetDeliveriesByGQL,
  GetDeliveryByIdGQL,
  GetOrderDeliveriesGQL,
  InsertDeliveryGQL,
  UpdateDeliveryGQL,
  UpdateDeliveryLineGQL,
  UpdateDeliveryLineMutationVariables,
  UpdateDeliveryMutationVariables
} from '@tanglass-erp/infrastructure/graphql';
import { deliveryFilter, DeliveryLine, InsertedDeliveryForm } from '@tanglass-erp/core/sales';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(
    private insertDeliveryGQL: InsertDeliveryGQL,
    private getDeliveryByIdGQL: GetDeliveryByIdGQL,
    private updateDeliveryLineGQL: UpdateDeliveryLineGQL,
    private updateDeliveryGQL: UpdateDeliveryGQL,
    private deleteDeliveryGQL: DeleteDeliveryGQL,
    private getDeliveriesByGQL: GetDeliveriesByGQL,
    private getOrderDeliveriesGQL: GetOrderDeliveriesGQL

  ) {}

  getBy(params: deliveryFilter) {
    const paramsToPass = {date: {}, status: {}};
    if (params.dateStart)  paramsToPass['date']["_gte"] = params.dateStart;
    if (params.dateEnd)  paramsToPass['date']["_lte"] = params.dateEnd;
    if (params.status)  paramsToPass['status'] = {"_eq": params.status};
    return this.getDeliveriesByGQL.fetch(paramsToPass);
  }

  getOneById(id: string) {
    return this.getDeliveryByIdGQL.fetch({ id });
  }

  insertOne(delivery: InsertedDeliveryForm) {
    return this.insertDeliveryGQL.mutate(delivery);
  }

  updateDeliveryLine(deliveryLine: UpdateDeliveryLineMutationVariables) {
    return this.updateDeliveryLineGQL.mutate(deliveryLine);
  }

  updateDelivery(delivery: InsertedDeliveryForm) {
    const { delivery_lines, ...deliveryOnly } = delivery;
    return combineLatest(
      this.updateDeliveryGQL.mutate(
        deliveryOnly as UpdateDeliveryMutationVariables
      ),
      ...delivery_lines.map((e) => {
        const deliveryLine: UpdateDeliveryLineMutationVariables = {
          id: e.id,
          product_draft_id: e.product_draft_id,
          amount: e.amount,
          delivered: e.delivered,
        };
        return this.updateDeliveryLineGQL.mutate(deliveryLine);
      })
    );
  }

  deleteMany(ids: string[]) {
    return this.deleteDeliveryGQL.mutate({ ids });
  }

  getOrderDeliveries(draft_id) {
    return this.getOrderDeliveriesGQL.fetch({ "draft_id": draft_id?{"_eq": draft_id}:{}});
  }

  calculateAmounts(delivery_lines: DeliveryLine[]) {
    const amount_ttc = delivery_lines
      .reduce((acc, curr) => acc + curr.amount, 0);
    const amount_tva = (amount_ttc/6);
    const amount_ht = amount_ttc*(5/6);
    return {
      amount_ttc,
      amount_tva,
      amount_ht
    }
  }
}
