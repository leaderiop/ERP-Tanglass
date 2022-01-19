import { Injectable } from '@angular/core';

import * as GlassActions from '../actions/glass.actions';
import * as GlassSelectors from '../selectors/glass.selectors';
import * as GlassReducers from '../reducers/glass.reducer';
import { RequireExactlyOne } from '@tanglass-erp/core/common';
import { InsertedGlass } from '@tanglass-erp/core/product';
import { Action, Store } from '@ngrx/store';
import * as ProductActions from '@TanglassStore/product/lib/actions/product.actions';

@Injectable({
  providedIn: 'root'
})
export class GlassFacadeService {
  loaded$ = this.store.select(GlassSelectors.getGlassesLoaded);
  allGlasses$ = this.store.select(GlassSelectors.getAllGlasses);
  selectedGlass$ = this.store.select(GlassSelectors.getSelectedGlass);

  constructor(private store: Store<GlassReducers.glassPartialState>) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAll() {
    this.dispatch(GlassActions.loadGlasses());
  }

  getById(id: string) {
    this.dispatch(GlassActions.loadGlassById({id}));
  }

  insertOne(glass: InsertedGlass) {
    this.dispatch(GlassActions.addGlass({glass}));
  }

  updateOne(glass: RequireExactlyOne<InsertedGlass, 'id'>) {
    this.dispatch(GlassActions.updateGlass({glass}));
  }

  removeMany(codes: string[]) {
    this.dispatch(ProductActions.removeManyProducts({codes}));
  }
}
