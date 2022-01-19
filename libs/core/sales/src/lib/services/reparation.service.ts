import { Injectable } from '@angular/core';
import { InsertBisItemGQL } from '@tanglass-erp/infrastructure/graphql';
import { Product_draft } from '@tanglass-erp/core/sales';
import { bisAdapter } from '../utils/adapters';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ReparationService {
  constructor(private insertBisItemGQL: InsertBisItemGQL) {}

  glassReparation(products: Product_draft[]) {
    return this.insertBisItemGQL.mutate({ glasses: bisAdapter(products) }).pipe(
      map((data) =>
        data.data.insert_sales_glass_draft.returning.map((data) => {
          const {
            __typename,
            service_draft,
            consumable_draft,
            ...item
          } = data.product_draft;
          return item;
        })
      )
    );
  }
}
