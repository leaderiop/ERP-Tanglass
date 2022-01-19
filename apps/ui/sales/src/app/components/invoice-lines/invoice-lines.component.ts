import { Component, Input, OnInit } from '@angular/core';
import { InvoiceLine } from '@tanglass-erp/core/sales';
import { Column, ColumnType } from '@tanglass-erp/material';

@Component({
  selector: 'ngx-invoice-lines',
  templateUrl: './invoice-lines.component.html',
  styleUrls: ['./invoice-lines.component.scss'],
})
export class InvoiceLinesComponent implements OnInit {
  title = 'Les articles';
  @Input() data: InvoiceLine[];
  displayedColumns: Array<Column> = [
    { title: 'Article', key: 'product_label', type: ColumnType.normal },
    { title: 'Code d\'article', key: 'product_code', type: ColumnType.normal },
    { title: 'Quantité', key: 'quantity', type: ColumnType.normal },
    { title: 'Prix unitaire', key: 'unit_price', type: ColumnType.normal },
    {
      title: 'Montant',
      key: 'total',
      type: ColumnType.normal
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
