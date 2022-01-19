import { Injectable } from '@angular/core';
import { GetAccessoryWarehousesByIdGQL, GetAllAccessoriesStockGQL } from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { AdaptSubstanceStockDetails } from '../utils/detailOrders.Adapter';

@Injectable({
  providedIn: 'root'
})
export class WarehouseAccessoryService {

  constructor(
    private getAllGQL: GetAllAccessoriesStockGQL,
    private getAccessoryWarehousesByIdGQL: GetAccessoryWarehousesByIdGQL,

  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges
  }

  getOneById(id: string) {
    return this.getAccessoryWarehousesByIdGQL.fetch({ id }).pipe(map((data) =>
    AdaptSubstanceStockDetails(data.data)))
  }

}
