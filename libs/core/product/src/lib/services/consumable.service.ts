import { Injectable } from '@angular/core';
import {
  DeleteManyGQL,
  DeleteOneGQL,
  GetAllConsumablesGQL,
  GetConsumableByIdGQL,
  InsertConsumableGQL,
  UpdateConsumableGQL
} from '@tanglass-erp/infrastructure/graphql';
import { InsertedConsumable } from '../models/consumable.model';
import { adaptProduct, adaptProductToUpdate } from '../utils/dataAdapter';

@Injectable({
  providedIn: 'root',
})
export class ConsumableService {
  constructor(
    private getAllGQL: GetAllConsumablesGQL,
    private getByIdGQL: GetConsumableByIdGQL,
    private insertOneGQL: InsertConsumableGQL,
    private deleteOneGQL: DeleteOneGQL,
    private deleteMany: DeleteManyGQL,
    private updateConsumableGQL: UpdateConsumableGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges;
  }

  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id });
  }

  insertOne(createdOne: InsertedConsumable) {
    let addeValue = adaptProduct(createdOne, 'consumable');

    return this.insertOneGQL.mutate(addeValue);
  }

  updateOne(consumable: InsertedConsumable) {
    const updatedValue = adaptProductToUpdate(consumable, 'consumable');
    return this.updateConsumableGQL.mutate(updatedValue);
  }

  removeOne(code: string) {
    return this.deleteOneGQL.mutate({ code });
  }

  removeMany(codes: string[]) {
    return this.deleteMany.mutate({ codes });
  }
}
