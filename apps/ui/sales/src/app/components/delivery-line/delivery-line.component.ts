import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeliveryLine, Product_draft } from '@tanglass-erp/core/sales';
import { Column, TableComponent } from '@tanglass-erp/material';
import { DeliveryFacade } from '@tanglass-erp/store/sales';
import { cloneDeep } from 'lodash';
import { deliveryLineHeaders } from '@TanglassUi/sales/utils/grid-headers';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'ngx-delivery-line',
  templateUrl: './delivery-line.component.html',
  styleUrls: ['./delivery-line.component.scss'],
})
export class DeliveryLineComponent implements OnInit {
  // Constants
  CURRENCY = env.CURRENCY


  @ViewChild('table', { read: TableComponent }) table: TableComponent<Product_draft>;
  _data: Product_draft[] = [];

  // Inputs
  @Input() update: boolean = false;
  @Input() public deliveryLines: Array<DeliveryLine> = [];
  @Input()
  public set data(data) {
    this._data = data;
    if (!this.update) {
      this.deliveryLines = this._data.map((elem) => ({
        product_draft_id: elem.id,
        product: {
          label: elem.label,
          type: elem.type,
          product_code: elem.product_code,
          price: elem.price,
          quantity: elem.count ?? elem.quantity,
          delivered: elem?.delivered,
          unit: elem?.unit
        },
        delivered: 0,
        amount: 0,
        toDeliver: 0
      }));
    }
  }

  // input
  clear: boolean = false;
  public get data() {
    return this._data;
  }


  displayedColumns: Array<Column> = deliveryLineHeaders;
  deliveryAmount$ = this.facade.deliveryAmount$;

  constructor(private facade: DeliveryFacade) {}

  ngOnInit(): void {
    this.facade.calculateAmounts(cloneDeep(this.deliveryLines));
    this.deliveryLines.forEach(value => value.toDeliver = value.delivered);
  }

  switchReturned(obj, newValue: boolean) {
    obj.isReturned = newValue;
  }

  setMax(input: HTMLInputElement, row) {
    row.delivered =
      row.delivered !== parseFloat(input.max) ? parseFloat(input.max) : 0;
    this.calculateAmount(row);
  }

  calculateAmount(item: DeliveryLine) {
    item.amount = item.delivered * item.product.price;
    this.facade.calculateAmounts(cloneDeep(this.deliveryLines));
  }

  public adaptValue(): DeliveryLine[] {
    const returnedValue = this.deliveryLines.map((e) => {
      const { product, toDeliver, ...wanted } = {
        ...e,
      };
      return wanted;
    });
    return returnedValue;
  }

  switchViews(elem1: HTMLElement, elem2: HTMLElement) {
    elem1.style.display="none";
    elem2.style.display="inline-block";
  }
}
