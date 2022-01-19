import { Injectable } from '@angular/core';
import {
  DeleteQuotationsGQL,
  GetAllQuotationsGQL,
  GetQuotationByIdGQL,
  InsertQuotationGQL,
  InsertQuotationMutationVariables,
  TransformQuotationToOrderGQL,
  UpdateQuotationGQL,
} from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import {
  InsertedQuotation,
  TransformedQuotation,
  invoiceFilter,
} from '@tanglass-erp/core/sales';
import { productAdapter, transfertQuotationAdapter } from '../utils/adapters';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor(
    private getAllQuotationsGQL: GetAllQuotationsGQL,
    private insertQuotationGQL: InsertQuotationGQL,
    private updateQuotationGQL: UpdateQuotationGQL,
    private getQuotationByIdGQL: GetQuotationByIdGQL,
    private deleteQuotationsGQL: DeleteQuotationsGQL,
    private transformQuotationToOrderGQL: TransformQuotationToOrderGQL
  ) {}

  getAll(params: invoiceFilter = {}) {
    return this.getAllQuotationsGQL.watch(params).valueChanges;
  }

  getOneById(id: number) {
    return this.getQuotationByIdGQL.fetch({ id }).pipe(
      map((data) => ({
        ...data.data.sales_quotation_by_pk,
        products: data.data.sales_quotation_by_pk.draft.product_drafts.map(
          (product) => {
            return productAdapter(product);
          }
        ),
      }))
    );
  }

  insertOne(order: InsertQuotationMutationVariables) {
    return this.insertQuotationGQL.mutate(order);
  }

  updateOne(quotation: Partial<InsertedQuotation>) {
    const { id, ...params } = quotation;
    return this.updateQuotationGQL.mutate({ id, params });
  }

  removeMany(ids: number[]) {
    return this.deleteQuotationsGQL.mutate({ ids });
  }
  deleteMany(ids: number[]) {
    return this.deleteQuotationsGQL.mutate({ ids });
  }
  transformQuotationToOrder(order: TransformedQuotation) {
    return this.transformQuotationToOrderGQL.mutate(
      transfertQuotationAdapter(order)
    );
  }
}
