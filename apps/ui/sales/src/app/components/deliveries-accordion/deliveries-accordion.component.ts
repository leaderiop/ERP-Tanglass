import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DeliveryForm } from '@tanglass-erp/core/sales';

@Component({
  selector: 'ngx-deliveries-accordion',
  templateUrl: './deliveries-accordion.component.html',
  styleUrls: ['./deliveries-accordion.component.scss']
})
export class DeliveriesAccordionComponent implements OnChanges {
  @Input() deliveries: DeliveryForm[];
  dataToShow: Array<any>;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.deliveries)
      this.dataToShow = this.deliveries.map(e => [
        {
          label: 'Infos',
          isToolbar: false,
          cols: 2,
          icons: [],
          data: [
            { label: 'N°', value: e.id },
            { label: 'Date Prévue', value: e.predicted_date, type: 'date' },
            { label: 'Retourné', value: e.isReturned ? 'oui' : 'non' },
            { label: 'Client', value: e.client.name },
            { label: 'Société', value: e.company.name },
            { label: 'Contact', value: e?.contact?.phone }
          ]
        }
      ]);
    }
}
