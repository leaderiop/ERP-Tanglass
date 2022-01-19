import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as fromStockAdjustments from '../reducers/stock-adjustments.reducer';
import * as StockAdjustmentsSelectors from '../selectors/stock-adjustments.selectors';
import * as StockAdjustmentActions from '../actions/stock-adjustments.actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubstanceWarehouse } from '@tanglass-erp/core/inventory';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Injectable()
export class StockAdjustmentsFacade {
  loaded$ = this.store.pipe(
    select(StockAdjustmentsSelectors.getStockAdjustmentsLoaded)
  );
  allStockAdjustments$ = this.store.pipe(
    select(StockAdjustmentsSelectors.getAllStockAdjustments)
  );
  selectedStockAdjustments$ = this.store.pipe(
    select(StockAdjustmentsSelectors.getSelected)
  );
  stockInHand = this.store.pipe(
    select(StockAdjustmentsSelectors.getStockInHand)
  );

  constructor(
    private store: Store<fromStockAdjustments.StockAdjustmentsPartialState>,
    private userStore: AuthFacadeService
  ) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
  loadStockAdjustments(): void {
    this.dispatch(StockAdjustmentActions.loadStockAdjustments());
  }
  addStockAdjustment(newAdjustment): void {
    let { code, type, warehouseName, ...adjustment } = newAdjustment;
    this.userStore.currentUser$
      .subscribe((user) => (adjustment.createdBy = user.id))
      .unsubscribe();
    this.dispatch(StockAdjustmentActions.addAdjustment({ adjustment }));
  }

  loadStockInHands(): void {
    this.dispatch(StockAdjustmentActions.loadStockInHand());
  }
  getQuantityInHand(
    substanceid: string,
    warehouseid: string
  ): Observable<SubstanceWarehouse> {
    return this.stockInHand.pipe(
      map((stocks) =>
        stocks.find(
          (stock) =>
            stock.substanceid == substanceid && stock.warehouseid == warehouseid
        )
      )
    );
  }
}
