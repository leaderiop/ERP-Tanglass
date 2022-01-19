import { Injectable } from '@angular/core';
import * as AccessoryActions from '../actions/accessory.actions';
import * as AccessorySelectors from '../selectors/accessory.selectors';
import * as AccessoryReducers from '../reducers/accessory.reducer';
import { RequireExactlyOne } from '@tanglass-erp/core/common';
import { Action, Store } from '@ngrx/store';
import { insertedAccessory } from '@tanglass-erp/core/product';
import * as ProductActions from '@TanglassStore/product/lib/actions/product.actions';

@Injectable({
  providedIn: 'root',
})
export class AccessoryFacadeService {
  loaded$ = this.store.select(AccessorySelectors.getAccessoriesLoaded);
  allAccessories$ = this.store.select(AccessorySelectors.getAllAccessories);
  selectedAccessory$ = this.store.select(AccessorySelectors.getSelectedAccessory);

  constructor(
    private store:Store<AccessoryReducers.accessoryPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAll() {
    this.dispatch(AccessoryActions.loadAccessories());
  }

  loadById(id: string) {
    this.dispatch(AccessoryActions.loadAccessoryById({id}));
  }

  insertOne(accessory: insertedAccessory) {
    this.dispatch(AccessoryActions.addAccessory({accessory}));
  }

  updateOne(accessory: RequireExactlyOne<insertedAccessory, 'id'>) {
    this.dispatch(AccessoryActions.updateAccessory({accessory}));
  }

  removeMany(codes: string[]) {
    this.dispatch(ProductActions.removeManyProducts({codes}));
  }
}
