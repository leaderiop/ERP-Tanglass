import { Component } from '@angular/core';
import { WarehouseCardComponent } from '@TanglassUi/inventory/pages/warehouse/warehouse-card/warehouse-card.component';

@Component({
  selector: 'ngx-warehouse-glasse-card',
  templateUrl: './warehouse-glasse-card.component.html',
  styleUrls: ['./warehouse-glasse-card.component.scss']
})
export class WarehouseGlasseCardComponent extends WarehouseCardComponent {

  title = "Entrepôt de verre";
  gap = "50px";
  id: string;
  step = null;
  passedData: any;
  glassData: any;

  dispatch(): void {
    this.facade.loadWarehouse(this.id);
  }

  passData(data?) {
    this.glassData = [
      {
        label: "Infos",
        isToolbar: false,
        cols: 2,
        icons: [ {name: "edit", tooltip: "Modification", event: 'editMain'} ],
        data : [
          { label: 'Type', value: data?.substance?.glass?.type },
          { label: 'Color', value: data?.substance?.glass?.color },
          { label: 'Epaisseur', value: data?.substance?.glass?.thickness },
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
          { label: 'Nom de la société', value: data?.warehouse?.company?.name },
          { label: 'Nom du point de vente', value: data?.warehouse?.salesPoint?.name },
          { label: 'Quantité', value: data?.quantity },
        ]
      }
    ];
  }
}
