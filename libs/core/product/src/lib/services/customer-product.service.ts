import { Injectable } from '@angular/core';
import {
  DeleteManyGQL,
  DeleteOneGQL,
  GetAllCustomerProductsGQL,
  InsertCustomerProductGQL
} from '@tanglass-erp/infrastructure/graphql';
import { CustomerProduct } from '../models/customerProduct.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerProductService {


  constructor(
    private getAllGQL: GetAllCustomerProductsGQL,
    private insertOneGQL: InsertCustomerProductGQL,
    private deleteOneGQL: DeleteOneGQL,
    private deleteMany:DeleteManyGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges
  }


  insertOne(createdOne: CustomerProduct) {
    return this.insertOneGQL.mutate(createdOne)
  }

  removeOne(code: string) {
    return this.deleteOneGQL.mutate({ code })
  }

  removeMany(codes: string[]) {
    return this.deleteMany.mutate({codes})
  }
}
