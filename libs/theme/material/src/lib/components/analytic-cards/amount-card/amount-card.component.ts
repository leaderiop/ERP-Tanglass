import { Component, Input, OnChanges } from '@angular/core';
import { CardConfig } from '../../../interfaces/card-config';

@Component({
  selector: 'ngx-amount-card',
  templateUrl: './amount-card.component.html',
  styleUrls: ['./amount-card.component.scss']
})
export class AmountCardComponent implements OnChanges {
  @Input() config: CardConfig;

  @Input() amount?: number;

  constructor() {
  }

  ngOnChanges(changes): void {
    if (this.config?.amount == null && !!this.amount) {
      this.config.amount = this.amount;
    }
  }

}
