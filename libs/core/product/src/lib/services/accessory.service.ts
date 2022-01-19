import { Injectable } from '@angular/core';
import {
  DeleteManyGQL,
  DeleteOneGQL,
  GetAccessoryByIdGQL,
  GetAllAccessoriesGQL,
  InsertAccessoryGQL,
  InsertAccessoryMutationVariables,
  UpdateAccessoryGQL,
  UpdateAccessoryMutationVariables
} from '@tanglass-erp/infrastructure/graphql';
import { insertedAccessory } from '../models/accessory.model';
import { adaptProduct, adaptProductToUpdate } from '../utils/dataAdapter';

@Injectable({
  providedIn: 'root',
})
export class AccessoryService {
  constructor(
    private getAllGQL: GetAllAccessoriesGQL,
    private getByIdGQL: GetAccessoryByIdGQL,
    private insertOneGQL: InsertAccessoryGQL,
    private deleteOneGQL: DeleteOneGQL,
    private deleteMany: DeleteManyGQL,
    private updateAccessoryGQL: UpdateAccessoryGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges;
  }

  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id });
  }

  insertOne(createdOne: insertedAccessory) {
    let addeValue: InsertAccessoryMutationVariables = adaptProduct(
      createdOne,
      'accessory'
    );
    return this.insertOneGQL.mutate(addeValue);
  }

  updateOne(accessory: insertedAccessory) {
    const updatedValue: UpdateAccessoryMutationVariables = adaptProductToUpdate(accessory, 'accessory');
    return this.updateAccessoryGQL.mutate(updatedValue);
  }

  removeOne(code: string) {
    return this.deleteOneGQL.mutate({ code });
  }

  removeMany(codes: string[]) {
    return this.deleteMany.mutate({ codes });
  }
}
