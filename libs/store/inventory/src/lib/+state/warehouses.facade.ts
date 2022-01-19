import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromWarehouses from '../reducers/warehouses.reducer';
import * as WarehousesSelectors from '../selectors/warehouses.selectors';
import * as WarehousesActions from '../actions/warehouses.actions';
import { InsertedWarehouse } from '@tanglass-erp/core/inventory';
import { RequireExactlyOne } from '@tanglass-erp/core/common';

@Injectable()
export class WarehousesFacade {
  loaded$ = this.store.pipe(select(WarehousesSelectors.getWarehousesLoaded));
  allWarehouses$ = this.store.pipe(
    select(WarehousesSelectors.getAllWarehouses)
  );
  selectedWarehouse$ = this.store.pipe(
    select(WarehousesSelectors.getSelectedWarehouse)
  );

  constructor(private store: Store<fromWarehouses.WarehousesPartialState>) {
    this.loadAllWarehouses();
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadWarehouse(id) {
    this.dispatch(WarehousesActions.loadWarehouseById({id: id}));
  }

  loadAllWarehouses() {
    this.dispatch(WarehousesActions.loadWarehouses());
  }

  addWarehouse(warehouse: InsertedWarehouse) {
    this.dispatch(WarehousesActions.addWarehouse({warehouse}))
  }

  updateWarehouse(warehouse: RequireExactlyOne<InsertedWarehouse, "id">) {
    this.dispatch(WarehousesActions.updateWarehouse({warehouse}))
  }

  removeWarehouses(ids: string[]) {
    this.dispatch(WarehousesActions.removeWarehouses({ids}));
  }

}
