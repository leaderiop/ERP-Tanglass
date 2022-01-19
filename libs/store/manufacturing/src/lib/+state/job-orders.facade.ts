import { Injectable, Injector } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as fromJobOrders from './job-orders.reducer';
import * as JobOrdersSelectors from './job-orders.selectors';
import * as JobOrdersActions from './job-orders.actions';
import {
  InsertedJobOrder,
  InsertedManufacturingLine,
  JobItem,
  JobOrder,
  JobProduct,
  ManufacturingLine,
} from '@tanglass-erp/core/manufacturing';
import { map } from 'rxjs/operators';
import { InvoiceGeneratorService } from '@tanglass-erp/core/common';
import { ProductionLinesAdapter } from './adapters/job-orders.adapters';

@Injectable()
export class JobOrdersFacade {
  loaded$ = this.store.pipe(select(JobOrdersSelectors.getJobOrdersLoaded));
  allJobOrders$ = this.store.pipe(select(JobOrdersSelectors.getAllJobOrders));
  selectedJobOrder$ = this.store.pipe(
    select(JobOrdersSelectors.getSelectedJobOrder)
  );
  selectedGlassLine$ = this.store.pipe(
    select(JobOrdersSelectors.getSelectedGlassLine)
  );
  selectedJobOrderGlasses$ = this.store.pipe(
    select(JobOrdersSelectors.getSelectedJobOrderGlasses)
  );
  withBarCodes$ = this.store.pipe(select(JobOrdersSelectors.getBarCodeState));

  constructor(
    private store: Store<fromJobOrders.JobOrdersPartialState>,
    private injector: Injector
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  loadAllJobOrders() {
    this.dispatch(JobOrdersActions.loadJobOrders());
  }
  addJobOrder(jobOrder: InsertedJobOrder) {
    this.dispatch(JobOrdersActions.addJobOrder({ jobOrder }));
  }
  loadJobOrderById(id) {
    this.dispatch(JobOrdersActions.loadJobOrderById({ id }));
  }
  adaptSelectedJobOrder() {
    return this.selectedJobOrder$.pipe(
      map((jobOrder) => {
        return {
          ...jobOrder,
          items: jobOrder?.glass_drafts?.map((item) => {
            return {
              id: item.id,
              item: (
                item.product_draft.label +
                ' :  ' +
                item.service_drafts.reduce(
                  (accumulator, product) =>
                    product.labelFactory + ' + ' + accumulator,
                  ''
                ) +
                item.consumable_drafts.reduce(
                  (accumulator, product) =>
                    product.labelFactory + ' + ' + accumulator,
                  ''
                )
              ).slice(0, -2),
              count: item.product_draft.count,
              dimensions:
                item.product_draft.heigth + ' X ' + item.product_draft.width,
            };
          }),
        };
      })
    );
  }
  addManufacturingLines() {
    const manufacturingLines: InsertedManufacturingLine[] = [];
    this.selectedJobOrder$.subscribe((data) =>
      data.glass_drafts.map((data: JobProduct) =>
        manufacturingLines.push({
          glass_id: data.id,
          count: data.product_draft.count,
        })
      )
    );
    this.dispatch(
      JobOrdersActions.addManufacturingLines({ manufacturingLines })
    );
  }

  setSelectedGlass(glassId: string) {
    let glass;
    this.selectedJobOrderGlasses$.subscribe(
      (data) => (glass = data.find((obj) => obj.id === glassId))
    );
    this.dispatch(JobOrdersActions.selectGlassLine({ glass }));
  }

  updateGlassLine(glass: JobProduct) {
    this.dispatch(JobOrdersActions.updateGlassLine({ glass }));
  }
  updateManufacturingProgress(linesList: ManufacturingLine[]) {
    const lines = ProductionLinesAdapter(linesList);
    this.dispatch(JobOrdersActions.updateLinesStates({ lines }));
  }

  generatePDF(jobOrder: JobOrder, jobItems: JobItem[]) {
    const invoiceGeneratorService = this.injector.get(InvoiceGeneratorService);
    invoiceGeneratorService.generateJobOrder(jobOrder, jobItems);
  }
}
