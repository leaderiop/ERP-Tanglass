import { Component, OnInit } from '@angular/core';
import { OrderPrint } from '../models/orderPrinting';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'ngx-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.scss'],
})
export class PrintOrderComponent implements OnInit {
  order: OrderPrint;
  constructor() {}

  ngOnInit(): void {
    this.order = new OrderPrint();
  }

  generatePDF() {
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.add(new Txt(this.order.client_name).bold().end);
    pdf.add(new Txt('Tél : ' +this.order.client_phone).margin([0,8]).end);
    pdf.add(new Txt('Date : ' +this.order.order_date).bold().alignment('right').end);

    pdf.add(new Txt('COMMANDE N° : ' +this.order.order_id).bold().end);
    pdf.add(new Txt('N° de série : ' ).bold().end);

    pdf.add(
      new Table(this.extratData()).widths([
        '25%',
        '15%',
        '15%',
        '15%',
        '15%',
        '15%',
      ]).layout({

      })
      .margin([0,8]).end
    );
    //second table for All the sales amounts
    pdf.add(
      new Table(this.extractSecondData()).widths(['45%', '15%', '20%', '20%']).margin([0,20])
        .end
    );
    pdf.create().open();
    pdf.create().print();
  }

  extratData() {
    return [
      ['Code', 'Qte', 'Largeur', 'Hauteur', 'M2', 'ML'],
      ...this.order.processedMaterial.map((row) => [
        row.code,
        row.NumberOf_pieces,
        row.width,
        row.height,
        row.m2,
        row.ml,
      ]),
    ];
  }
  extractSecondData() {
    return [
      ['Désignation', 'Qté M2/ML', 'PU', 'Montant H.T'],
      ...this.order.salesData.map((row) => [
        row.item_designation,
        row.quantity,
        row.unit_price,
        row.total_price,
      ]),
    ];
  }
}
