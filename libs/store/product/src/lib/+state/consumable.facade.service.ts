import { Injectable } from '@angular/core';

import * as ConsumableActions from '../actions/consumable.actions';
import * as ConsumableSelectors from '../selectors/consumable.selectors';
import * as ConsumableReducers from '../reducers/consumable.reducer';
import { RequireExactlyOne } from '@tanglass-erp/core/common';
import { Action, Store } from '@ngrx/store';
import { InsertedConsumable } from '@tanglass-erp/core/product';
import * as ProductActions from '@TanglassStore/product/lib/actions/product.actions';


@Injectable({
  providedIn: 'root'
})
export class ConsumableFacadeService {
  loaded$ = this.store.select(ConsumableSelectors.getConsumablesLoaded);
  allConsumables$ = this.store.select(ConsumableSelectors.getAllConsumables);
  selectedConsumable$ = this.store.select(ConsumableSelectors.getSelectedConsumable);

  constructor(
    private store:Store<ConsumableReducers.consumablePartialState>
  ) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAll() {
    this.dispatch(ConsumableActions.loadConsumables());
  }

  loadById(id: string) {
    this.dispatch(ConsumableActions.loadConsumableById({id}));
  }

  insertOne(consumable: InsertedConsumable) {
    this.dispatch(ConsumableActions.addConsumable({consumable}));
  }

  updateOne(consumable: RequireExactlyOne<InsertedConsumable, 'id'>) {
    this.dispatch(ConsumableActions.updateConsumable({consumable}));
  }

  removeMany(codes: string[]) {
    this.dispatch(ProductActions.removeManyProducts({codes}));
  }
}
