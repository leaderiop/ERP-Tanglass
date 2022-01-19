import { Injectable } from '@angular/core';
import {
  DeletePurchaseDeliveryGQL,
  GetAllPurchasesDeliveriesGQL,
  GetPurchaseDeliveryByIdGQL,
  InsertDeliveryItemsGQL,
  InsertPurchaseDeliveryGQL
} from '@tanglass-erp/infrastructure/graphql';
import { InsertedPurchaseItem } from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(
    private getPurchaseDeliveriesGQL: GetAllPurchasesDeliveriesGQL,
    private insertPurchaseDeliveryGQL: InsertPurchaseDeliveryGQL,
    private getPurchaseDeliveryByIdGQL: GetPurchaseDeliveryByIdGQL,
    private deletePurchaseDeliveryGQL: DeletePurchaseDeliveryGQL,
    private insertDeliveryItemsGQL:InsertDeliveryItemsGQL
    ) {}

  getAll() {
    return this.getPurchaseDeliveriesGQL.watch().valueChanges;
  }

  getOneById(id: number) {
    return this.getPurchaseDeliveryByIdGQL.fetch({ id });
  }

  insertOne(delivery) {
    return this.insertPurchaseDeliveryGQL.mutate(delivery);
  }
  removeMany(ids: number[]) {
    return this.deletePurchaseDeliveryGQL.mutate({ ids });
  }
  addManyItems(items:InsertedPurchaseItem[]){
   return this.insertDeliveryItemsGQL.mutate({items})
  }
}
