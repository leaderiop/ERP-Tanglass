import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromDelivery from './delivery.reducer';
import * as DeliverySelectors from './delivery.selectors';
import * as DeliveryActions from './delivery.actions';
import {
  deliveryFilter,
  DeliveryForm,
  DeliveryLine,
  DeliveryStatus,
  InsertedDeliveryForm
} from '@tanglass-erp/core/sales';
import { filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InvoiceGeneratorService } from '@tanglass-erp/core/common';
import { ToastService } from '@TanglassTheme/services/toast.service';

const DELIVERY_WARNING = 'Assurez-vous que tous les bons de livraisons séléctionnés ne sont pas encore facturés';

@Injectable()
export class DeliveryFacade {
  loaded$ = this.store.pipe(select(DeliverySelectors.getDeliveryLoaded));
  deliveryAmount$ = this.store.pipe(select(DeliverySelectors.getDeliveryAmount));
  allDelivery$ = this.loaded$.pipe(
    filter((e) => !!e),
    switchMap(() => this.store.pipe(select(DeliverySelectors.getAllDelivery)))
  );
  selectedDelivery$ = this.store
    .pipe(select(DeliverySelectors.getSelectedEntity))
    .pipe(filter((e) => !!e));

  orderDeliveries$=this.store.pipe(select(DeliverySelectors.getSelectedOrderDeliveries))

  constructor(
    private store: Store<fromDelivery.DeliveryPartialState>,
    private router: Router,
    private toastService: ToastService,
    public invoiceGeneratorService: InvoiceGeneratorService,
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadDeliveries(params: deliveryFilter) {
    this.dispatch(DeliveryActions.loadDelivery(params));
  }


  loadDeliveryById(id: string) {
    this.dispatch(DeliveryActions.loadDeliveryById({ id }));
  }

  addDelivery(delivery: InsertedDeliveryForm) {
    this.dispatch(DeliveryActions.addDelivery({ delivery }));
  }

  updateDelivery(delivery: InsertedDeliveryForm) {
    this.dispatch(DeliveryActions.updateDelivery({ delivery }));
  }

  removeDelivery(ids: string[]) {
    this.dispatch(DeliveryActions.removeDelivery({ ids }));
  }

  // calculateAmounts(delivery_lines: DeliveryLine[]) {
  //   const amount_ttc = delivery_lines
  //     .reduce((acc, curr) => acc + curr.amount, 0);
  //   const amount_tva = (amount_ttc/6);
  //   const amount_ht = amount_ttc*(5/6);
  //   return {
  //     amount_ttc,
  //     amount_tva,
  //     amount_ht
  //   }
  // }

  calculateAmounts(delivery_lines: DeliveryLine[]) {
    this.dispatch(DeliveryActions.calcDeliveryAmount({delivery_lines}));
  }

  printDelivery(delivery: InsertedDeliveryForm) {
    this.invoiceGeneratorService.generateDeliveryLinePDF(delivery);
  }

  //  Other
  deliveryToInvoice(data: Array<DeliveryForm>) {
    if (!data.every((e) => e.status === DeliveryStatus.NOT_INVOICED)) {
      this.toastService.showToast(
        'warning',
        'Facture',
        DELIVERY_WARNING
      );
      return;
    }
    this.router.navigate(['sales/invoice/add'], {
      state: { deliveries: data.map((e) => ({ delivery_id: e.id })) },
    });
  }

  loadOrderDeliveries(draft_id: number) {
    this.dispatch(DeliveryActions.loadOrderDeliveries({draft_id}));
  }
}
