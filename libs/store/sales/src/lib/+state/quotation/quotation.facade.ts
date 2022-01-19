import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as fromQuotation from './quotation.reducer';
import * as QuotationSelectors from './quotation.selectors';
import * as QuotationsActions from './quotation.actions';
import { InsertedQuotation, invoiceFilter, Order, Quotation, TransformedQuotation } from '@tanglass-erp/core/sales';
import { InvoiceGeneratorService } from '@tanglass-erp/core/common';
import { filter } from 'rxjs/operators';

@Injectable()
export class QuotationFacade {
  loaded$ = this.store.pipe(select(QuotationSelectors.getQuotationLoaded));
  allQuotation$ = this.store.pipe(select(QuotationSelectors.getAllQuotation));
  // selectedQuotation$ = this.store.pipe(
  //   select(QuotationSelectors.getSelectedQuotation)
  // );
  loadedQuotation$ = this.store.pipe(
    select(QuotationSelectors.getLoadedQuotation),
    filter(e => !!e)
  );
  constructor(
    private store: Store<fromQuotation.QuotationPartialState>,
    public invoiceGeneratorService: InvoiceGeneratorService
  ) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  loadAllQuotations(params: invoiceFilter): void {
    this.dispatch(QuotationsActions.loadQuotations(params));
  }
  addQuotation(quotation: InsertedQuotation) {
    this.dispatch(QuotationsActions.addQuotation({ quotation }));
  }

  updateQuotation(quotation: Partial<InsertedQuotation>) {
    this.dispatch(QuotationsActions.updateQuotation({quotation}))
  }

  removeMany(ids: number[]): void {
    this.dispatch(QuotationsActions.deleteQuotations({ ids }));
  }
  loadQuotationById(id): void {
    this.dispatch(QuotationsActions.loadQuotationById({ id }));
  }
  transformToOrder(orderInfos: TransformedQuotation): void {
    this.loadedQuotation$.subscribe((quotation) => {
      this.dispatch(
        QuotationsActions.TransformToOrder({
          transformingVariables: {
            ...orderInfos,
            quotation,
          },
        })
      );
    }).unsubscribe();
  }

  printQuotation(quotation: Quotation): void {
    this.invoiceGeneratorService.generateOrderPDF(<Order>quotation,true);
  }
}
