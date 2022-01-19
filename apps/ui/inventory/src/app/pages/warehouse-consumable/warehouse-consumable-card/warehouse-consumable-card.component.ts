import { Component } from '@angular/core';
import { WarehouseCardComponent } from '@TanglassUi/inventory/pages/warehouse/warehouse-card/warehouse-card.component';

@Component({
  selector: 'ngx-warehouse-consumable-card',
  templateUrl: './warehouse-consumable-card.component.html',
  styleUrls: ['./warehouse-consumable-card.component.scss']
})
export class WarehouseConsumableCardComponent extends WarehouseCardComponent {
  title = "Entrepôt consommable";
  gap = "50px";

  passData(data?) {
    return [
      {
        label: "Infos",
        isToolbar: "true",
        cols: 2,
        icons: [ {name: "edit", tooltip: "Modification", event: 'editMain'} ],
        data: [
          {label: 'Nom de la société', value: data?.warehouse?.company?.name},
          {label: 'Nom du point de vente', value: data?.warehouse?.salesPoint?.name},
          {label: 'Catégorie du consommable', value: data?.substance.consomable?.category},
          {label: 'Quantité', value: data?.quantity},
        ]
      }
    ];
  }

}
