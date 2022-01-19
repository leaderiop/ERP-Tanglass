import { Injectable } from '@angular/core';
import {
  DeleteManyGQL,
  DeleteServiceGQL,
  GetAllServiceConfigGQL,
  GetServiceConfigByIdGQL,
  InsertServiceConfigGQL,
  InsertServiceGQL,
  InsertServiceMutationVariables,
  UpdateServiceGQL
} from '@tanglass-erp/infrastructure/graphql';
import { InsertedService, InsertedServiceConfig } from '../models/service.model';
import { adaptProduct } from '../utils/dataAdapter';

@Injectable({
  providedIn: 'root',
})
export class ServicesConfigService {
  constructor(
    private getAllGQL: GetAllServiceConfigGQL,
    private getByIdGQL: GetServiceConfigByIdGQL,
    private insertOneGQL: InsertServiceConfigGQL,
    private insertOneItemGQL: InsertServiceGQL,
    private deleteMany: DeleteManyGQL,
    private updateServiceGQL: UpdateServiceGQL,
    private deleteServiceGQL: DeleteServiceGQL,
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges;
  }

  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id });
  }

  insertOne(createdOne: InsertedServiceConfig) {
    return this.insertOneGQL.mutate(createdOne);
  }

  addOneItem(createdOne: InsertedService) {
    let addeValue: InsertServiceMutationVariables = adaptProduct(
      createdOne,
      'service'
    );

    return this.insertOneItemGQL.mutate(addeValue);
  }

  removeManyItems(codes: string[]) {
    return this.deleteMany.mutate({ codes });
  }

  update(id: string, labelFactory: string, name: string) {
    return this.updateServiceGQL.mutate({id, labelFactory, name})
  }

  delete(id: string) {
    return this.deleteServiceGQL.mutate({id});
  }
}
