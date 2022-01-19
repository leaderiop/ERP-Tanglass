import { Component } from '@angular/core';
import { WarehouseCardComponent } from '@TanglassUi/inventory/pages/warehouse/warehouse-card/warehouse-card.component';


@Component({
  selector: 'ngx-warehouse-accessory-card',
  templateUrl: './warehouse-accessory-card.component.html',
  styleUrls: ['./warehouse-accessory-card.component.scss']
})
export class WarehouseAccessoryCardComponent extends WarehouseCardComponent {
  title = "Entrepôt d'accessoires";
  gap = "50px";
  accessoryData: any;


  passData(data?) {
    this.accessoryData = [
      {
        label: "Infos",
        isToolbar: false,
        cols: 2,
        icons: [ {name: "edit", tooltip: "Modification", event: 'editMain'} ],
        data : [
          {label: 'Catégorie', value: data?.substance?.accessory.category},
          {label: 'Code', value: data?.substance?.productAccessory.code},
          {label: 'Désignation', value: data?.substance?.productAccessory.label},
          {label: 'Prix', value: data?.substance?.productAccessory.price},
          {label: 'Unité', value: data?.substance?.productAccessory.unit},
        ]
      }
    ];
    return [
      {
        label: "Infos",
        isToolbar: "true",
        cols: 2,
        icons: [ {name: "edit", tooltip: "Modification", event: 'editMain'} ],
        data: [
          {label: 'Nom de la société', value: data?.warehouse?.company?.name},
          {label: 'Nom du point de vente', value: data?.warehouse?.salesPoint?.name},
          {label: 'Quantité', value: data?.quantity},
        ]
      }
    ];
  }
}
