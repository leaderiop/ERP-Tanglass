import { Component } from '@angular/core';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import { DeliveriesFacade, PurchaseDelivery } from '@tanglass-erp/store/purchase';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-delivery-card',
  templateUrl: './delivery-card.component.html',
  styleUrls: ['./delivery-card.component.scss'],
})
export class DeliveryCardComponent extends ModelCardComponent {
  title = 'Réception';
  isCardMode: boolean = true;
  data$ = this.facade.loadedDelivery$.pipe(takeUntil(this._onDestroy));
  constructor(
    public activatedRoute: ActivatedRoute,
    protected facade: DeliveriesFacade,
  ) {
    super(activatedRoute);
  }

  afterComplete() {}

  dispatch(): void {
    this.facade.loadDeliveryById(+this.id);
  }

  passData(data?: PurchaseDelivery) {
    return [
      {
        label: 'Infos Générales',
        isToolbar: 'true',
        cols: 3,
        icons: [{ name: 'edit', tooltip: 'Modification', event: 'editMain' }],
        data: [
          { label: 'Réference', value: data?.id },
          { label: 'Date', value: data?.date, type: 'date' },
          { label: 'Fournisseur', value: data?.provider.name },
          { label: 'code', value: data?.provider?.code },
          { label: 'Tel N°:', value: data?.provider?.phone },
        ],
      },
    ];
  }

  eventTriggering(event) {
    // Store Action Dispatching update
  }

  edit() {
    this.isCardMode = false;
  }
  print() {}
  save() {
    this.isCardMode = true;
    this.facade.addManyItems(+this.id)
  }
  cancel() {
    this.isCardMode = true;
  }

}
