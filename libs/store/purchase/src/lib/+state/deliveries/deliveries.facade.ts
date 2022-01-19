import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromPurchases from './deliveries.reducer';
import * as DeliveriesSelectors from './deliveries.selectors';
import * as DeliveryActions from './deliveries.actions';
import { InsertedPurchaseDelivery, PurchaseItem } from '@tanglass-erp/core/purchase';

@Injectable()
export class DeliveriesFacade {
  loaded$ = this.store.pipe(select(DeliveriesSelectors.getDeliveriesLoaded));
  allDeliveries$ = this.store.pipe(
    select(DeliveriesSelectors.getAllDeliveries)
  );

  loadedDelivery$ = this.store.pipe(
    select(DeliveriesSelectors.getSelectedDelivery)
  );

  // selectedDeliveries$ = this.store.pipe(
  //   select(DeliveriesSelectors.getSelected)
  // );

  selectedDeliveryItems$ = this.store.pipe(
    select(DeliveriesSelectors.getSelectedDeliveryItems)
  );

  constructor(private store: Store<fromPurchases.DeliveriesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  loadDeliveries() {
    this.dispatch(DeliveryActions.loadDeliveries());
  }

  loadDeliveryById(id: number) {
    this.dispatch(DeliveryActions.loadDeliveryById({ id }));
  }

  addDelivery(delivery: InsertedPurchaseDelivery) {
    this.selectedDeliveryItems$
      .subscribe((deliveries) =>
        this.dispatch(
          DeliveryActions.addDelivery({
            delivery: {
              ...delivery,
              items: deliveries,
            },
          })
        )
      )
      .unsubscribe();
  }

  removeDelivery(ids: number[]) {
    this.dispatch(DeliveryActions.removeDelivery({ ids }));
  }

  addDeliveryItem(item: PurchaseItem) {
    this.dispatch(DeliveryActions.addDeliveryItem({ item }));
  }

  clearDeliveryItems() {
    this.dispatch(DeliveryActions.clearDeliveryItems());
  }
  removeMany(ids: number[]): void {
    this.dispatch(DeliveryActions.removeDelivery({ ids }));
  }
  addManyItems(id: number): void {
    var items = [];
    this.selectedDeliveryItems$
      .subscribe((data) => {
        items = data.filter((item) => !item.id);
      })
      .unsubscribe();
      items=items.map(item=>({...item,delivery_id:id}))
     this.dispatch(DeliveryActions.addManyDeliveryItems({ items }));
  }
}
