import { Injectable } from '@angular/core';
import {
  DeleteManyWarehousesGQL,
  GetAllWarehousesGQL,
  GetWarehouseByIdGQL,
  InsertWarehouseGQL,
  UpdateWarehouseGQL
} from '@tanglass-erp/infrastructure/graphql';
import * as fromWarehouse from '../models/warehouse.model';
import { RequireExactlyOne } from '@tanglass-erp/core/common';


@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(
    private getAllGQL: GetAllWarehousesGQL,
    private getByIdGQL: GetWarehouseByIdGQL,
    private deleteMany: DeleteManyWarehousesGQL,
    private insertWarehouseGQL: InsertWarehouseGQL,
    private updateWarehouseGQL: UpdateWarehouseGQL,
  ) {}



  getAll() {
    return this.getAllGQL.watch().valueChanges;
  }

  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id });
  }

  removeMany(ids: string[]) {
    return this.deleteMany.mutate({ ids });
  }

  insertOne(createdOne: fromWarehouse.InsertedWarehouse) {
    return this.insertWarehouseGQL.mutate(createdOne);
  }

  updateOne(
    warehouse: RequireExactlyOne<fromWarehouse.InsertedWarehouse, 'id'>
  ) {
    return this.updateWarehouseGQL.mutate(warehouse);
  }
}
