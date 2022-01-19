import { Component } from '@angular/core';
import {
  DeliveryFacade,
  DetailedOrder,
  OrdersFacade,
  ProductDraftFacade,
  Sales_Draft_Status_Enum,
} from '@tanglass-erp/store/sales';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelCardComponent } from '@tanglass-erp/material';
import { JobOrdersFacade } from '@tanglass-erp/store/manufacturing';

@Component({
  selector: 'ngx-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent extends ModelCardComponent {
  title = 'Commande CARD';
  glasses_ids;
  data$ = this.facade.loadedOrder$.pipe(takeUntil(this._onDestroy));
  isCardMode: boolean = true;
  isLaunched: boolean;
  order_id: number;
  draft_id: number;
  constructor(
    public activatedRoute: ActivatedRoute,
    protected facade: OrdersFacade,
    private router: Router,
    protected deliveryFacade: DeliveryFacade,
    protected productDraftFacade: ProductDraftFacade,
    protected manufacturingFacade: JobOrdersFacade
  ) {
    super(activatedRoute);
  }

  dispatch(): void {
    this.isLaunched = false;
    this.facade.loadOrderById(this.id);
  }
  passData(data: DetailedOrder) {
    data?.draft_status == Sales_Draft_Status_Enum.Lance
      ? (this.isLaunched = true)
      : (this.isLaunched = false);
    this.order_id = data?.id;
    this.draft_id = data?.draft_id;
    return [
      {
        label: 'Infos Générales',
        isToolbar: 'true',
        cols: 4,
        icons: [{ name: 'edit', tooltip: 'Modification', event: 'editMain' }],
        data: [
          { label: 'Réf ', value: data?.ref },
          { label: 'ID.', value: data?.id },
          { label: 'Société', value: data?.company.name },
          { label: 'Point de Vente', value: data?.salepoint?.name },
          { label: 'Client', value: data?.customer.name },
          { label: 'Tél', value: data?.customer.phone },
          { label: 'Date', value: data?.date },
          { label: 'Date limite ', value: data?.deadline },
          { label: 'Livraison', value: [data?.delivery_status], type: 'chips' },
          { label: 'Paiement', value: [data?.payment_status], type: 'chips' },
          { label: 'Status', value: [data?.draft_status], type: 'chips' },
        ],
      },
    ];
  }
  afterComplete() {}
  edit() {
    this.isCardMode = false;
  }
  save() {
    this.isCardMode = true;
    this.productDraftFacade.amounts$
      .subscribe((amounts) => {
        let total = amounts.pop();
        this.facade.updateOrder({
          order_id: this.order_id,
          total_ttc: total.total_ttc,
          total_tax: total.total_tax,
          total_ht: total.total_ht,
          amounts: amounts.map((amount) => ({
            ...amount,
            company_name: amount.company_name,
            draft_id: this.draft_id,
          })),
        });
      })
      .unsubscribe();
  }
  cancel() {
    this.router.navigate(['/sales/order']);
  }
  print() {
    this.facade.printOrder(this.data);
  }
  printAccessories(){
    
  }
  launch() {
    let order: DetailedOrder;
    this.productDraftFacade.getProductsGroups().subscribe(
      (data) =>
        (this.glasses_ids = data.glasses.map((data) => ({
          id: data.glass_draft.id,
        })))
    );
    this.data$.subscribe((data) => (order = data));
    this.manufacturingFacade.addJobOrder({
      order_ref: order.ref,
      ids: this.glasses_ids,
    });
  }
}
