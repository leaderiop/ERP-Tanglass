import { Injectable } from '@angular/core';
import {
  GetAllGlassesStockGQL,
  GetGlassWarehousesByIdGQL,
} from '@tanglass-erp/infrastructure/graphql';
import { AdaptSubstanceStockDetails } from '../utils/detailOrders.Adapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGlassService {
  constructor(
    private getAllGQL: GetAllGlassesStockGQL,
    private getGlassWarehousesByIdGQL: GetGlassWarehousesByIdGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges
  }

  getOneById(id: string) {
    return this.getGlassWarehousesByIdGQL
      .fetch({ id })
      .pipe(map((data) => AdaptSubstanceStockDetails(data.data)));
  }
}
