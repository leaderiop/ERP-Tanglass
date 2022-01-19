import { Injectable } from '@angular/core';
import { GetAllConsumablesStockGQL, GetConsumableWarehousesByIdGQL } from '@tanglass-erp/infrastructure/graphql';
import { AdaptSubstanceStockDetails } from '../utils/detailOrders.Adapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WarehouseConsumableService {

  constructor(
    private getAllGQL: GetAllConsumablesStockGQL,
    private getConsumableWarehousesById: GetConsumableWarehousesByIdGQL,

  ) {
    /**
    let data:fromWConso.ConsumableWarehouse[];
    this.getAll().subscribe(o=>data=o.data.stock_warehouse_substance)
    */
  }

  getAll() {
    return this.getAllGQL.watch().valueChanges
  }

  getOneById(id: string){
    return this.getConsumableWarehousesById.fetch({ id }).pipe(map((data) =>
    AdaptSubstanceStockDetails(data.data)))
  }
}
