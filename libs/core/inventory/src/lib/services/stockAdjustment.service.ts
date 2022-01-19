import { Injectable } from '@angular/core';
import {
  GetAllStockAdjustmentsGQL,
  GetWarehouseSubstanceGQL,
  InsertStockAdjustmentGQL
} from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { AdaptInsertedStockAdjustment, AdaptStockAdjustment } from '../utils/adjustment.Adapter';

@Injectable({
  providedIn: 'root',
})
export class StockAdjustmentService {
  constructor(
    private getAllGQL: GetAllStockAdjustmentsGQL,
    private insertStockAdjustmentGQL: InsertStockAdjustmentGQL,
    private getWarehouseSubstanceGQL: GetWarehouseSubstanceGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges.pipe(
      map((data) =>
        data.data.stock_stock_adjustment.map((value) => {
          let { __typename, ...adjustmentDB } = value;
          return AdaptStockAdjustment(adjustmentDB);
        })
      )
    );
  }
  insertOne(createdOne) {
    return this.insertStockAdjustmentGQL.mutate(createdOne).pipe(
      map((data) => {
        let {
          __typename,
          ...adjustmentDB
        } = data.data.insert_stock_warehouse_substance_one;
        return AdaptInsertedStockAdjustment(adjustmentDB);
      })
    );
  }
  getAllSubstancesWarehouses() {
    return this.getWarehouseSubstanceGQL.watch().valueChanges;
  }
}
