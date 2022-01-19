import { Component } from '@angular/core';
import { WarehousesFacade } from '@TanglassStore/inventory/index';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModelCardComponent } from '@tanglass-erp/material';

@Component({
  selector: 'ngx-sale-point-card',
  templateUrl: './warehouse-card.component.html',
  styleUrls: ['./warehouse-card.component.scss']
})
export class WarehouseCardComponent extends ModelCardComponent {
  title = "Entrepôt";
  gap = "50px";
  id: string;
  step = null;
  data$ = this.facade.selectedWarehouse$
    .pipe(takeUntil(this._onDestroy));

  constructor(private activatedRoute: ActivatedRoute,
              protected facade: WarehousesFacade) {
    super(activatedRoute);
  }

  dispatch(): void {
    this.facade.loadWarehouse(this.id);
  }

  passData(data?) {
    return [
      {
        label: "Infos",
        isToolbar: "true",
        cols: 2,
        icons: [ {name: "edit", tooltip: "Modification", event: 'editMain'} ],
        data: [
          {label: 'Nom de l\'entrepôt', value: data?.name},
          {label: 'Nom de la société', value: data?.company?.name},
          {label: 'Nom du point de vente', value: data?.salesPoint?.name},
        ]
      }
    ];
  }
  afterComplete() {}
}
