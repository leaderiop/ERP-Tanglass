import { Component } from '@angular/core';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ConsumableFacadeService, DetailedConsumable } from '@TanglassStore/product/index';

@Component({
  selector: 'ngx-consumable-card',
  templateUrl: './consumable-card.component.html',
  styleUrls: ['./consumable-card.component.scss'],
})
export class ConsumableCardComponent extends ModelCardComponent {
  title = 'Consommable';
  data$ = this.facade.selectedConsumable$
    .pipe(takeUntil(this._onDestroy));

  constructor(private facade: ConsumableFacadeService, public route: ActivatedRoute) {
    super(route);
  }

  dispatch(): void {
    this.facade.loadById(this.id);
  }

  passData(data: DetailedConsumable) {
    return [
      {
        label: 'Infos',
        isToolbar: 'true',
        cols: 4,
        icons: [{ name: 'edit', tooltip: 'Modification', event: 'editMain' }],
        data: [
          { label: 'Code', value: data?.product.code },
          { label: 'Désignation', value: data?.product.label },
          { label: 'Unité', value: data?.product.unit },
          { label: 'Prix', value: data?.product?.price },
          { label: 'Prix min', value: data?.product?.priceMin },
          { label: 'Prix max', value: data?.product?.priceMax },
          {
            label: 'Sociétés',
            value: data?.product?.companies.map((item) => item.name),
            type: 'chips',
          },
        ],
      },

      {
        label: 'Détails',
        isToolbar: 'true',
        cols: 4,
        icons: [{ name: 'edit', tooltip: 'Modification' }],
        data: [
          { label: 'Type', value: data?.category },
          { label: 'createdAt', value: data?.createdAt },
          { label: 'createdBy', value: data?.createdBy },
          { label: 'updatedAt', value: data?.updatedAt },
          { label: 'updatedBy', value: data?.updatedBy },
        ],
      },
    ];
  }

  afterComplete() {}
}
