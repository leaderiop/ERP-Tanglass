import { Injectable } from '@angular/core';
import {
  DeleteInvoicesGQL,
  GetAllInvoicesGQL,
  GetDeliveriesAmountsGQL,
  GetDeliveryLinesGQL,
  GetInvoiceByIdGQL,
  InsertInvoiceGQL,
  UpdateInvoiceGQL,
} from '@tanglass-erp/infrastructure/graphql';
import {
  InsertedInvoice,
  invoiceFilter,
  InvoiceLine,
  UpdatedInvoice,
} from '@tanglass-erp/core/sales';
import { map, mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private insertInvoiceGQL: InsertInvoiceGQL,
    private updateInvoiceGQL: UpdateInvoiceGQL,
    private getAllInvoicesGQL: GetAllInvoicesGQL,
    private getInvoiceByIdGQL: GetInvoiceByIdGQL,
    private deleteInvoicesGQL: DeleteInvoicesGQL,
    private getDeliveryLinesGQL: GetDeliveryLinesGQL,
    private getDeliveriesAmountsGQL: GetDeliveriesAmountsGQL
  ) {}

  getAll(params: invoiceFilter = {}) {
    return this.getAllInvoicesGQL.fetch(params);
  }

  getOneById(id: string) {
    return this.getInvoiceByIdGQL.fetch({ id });
  }

  insertOne(invoice: InsertedInvoice) {
    return this.calculateAmounts(
      invoice.deliveries.map((e) => e.delivery_id)
    ).pipe(
      mergeMap((amounts) =>
        this.insertInvoiceGQL.mutate({
          ...invoice,
          deliveries_ids: invoice.deliveries.map((e) => e.delivery_id),
          ...amounts,
        })
      )
    );
  }

  updateOne(invoice: UpdatedInvoice) {
    return this.updateInvoiceGQL.mutate(invoice);
  }

  deleteMany(ids: string[]) {
    return this.deleteInvoicesGQL.mutate({ ids });
  }

  calculateAmounts(ids: string[]) {
    return this.getDeliveriesAmountsGQL.fetch({ ids }).pipe(
      take(1),
      map((value) => {
        const data = value.data.sales_delivery;
        const amount_ht: number = data.reduce(
          (acc, curr) => acc + curr.amount_ht,
          0
        );
        const amount_ttc = data.reduce((acc, curr) => acc + curr.amount_ttc, 0);
        const amount_tva = data.reduce((acc, curr) => acc + curr.amount_tva, 0);
        return {
          amount_ht,
          amount_ttc,
          amount_tva,
        };
      })
    );
  }

  prepareInvoiceLines(deliveries: string[]) {
    const invoiceLinesMap = new Map<String, InvoiceLine>();
    return this.getDeliveryLinesGQL.fetch({ deliveries }).pipe(
      map((data) => {
        const deliveryLines = data.data.sales_delivery_line;
        deliveryLines.forEach((delivery) => {
          const key = delivery.product_draft.product_code;
          const item = invoiceLinesMap.get(delivery.product_draft.product_code);
          if (!item)
            invoiceLinesMap.set(key, {
              product_code: key,
              unit_price: delivery.product_draft.price || 0,
              total: delivery.amount,
              quantity: delivery.delivered,
              product_label: delivery.product_draft.label,
              product_type: delivery.product_draft.type,
            });
          else item.quantity += delivery.delivered;
        });
        return [...invoiceLinesMap.values()];
      })
    );
  }
}
