import { PDFCommon } from './pdf';
import { Columns, Table, Txt } from 'pdfmake-wrapper';
import { ProductToPrint } from '../../models/print';
import { NUM_TO_WORDS, OFFRE_VALID, PAYMENT_METHOD, PAYMENT_PERC } from '../resources';
import { numToWords } from '../utilities';
import { Product_draft } from '@tanglass-erp/core/sales';

export class OrderPrint extends PDFCommon {

  generateOrderPDF(transfert, isExternal = false) {

    const pdf = super.initialize_pdf();
    pdf.add(new Txt(transfert.fromSalePoint.name).fontSize(20).bold().end);
    // pdf.add(
    //   new Txt('Tél : ' + order.customer.phone + '\n\n').margin([0, 8]).end
    // );

    pdf.add(
      new Columns([
        new Columns([
          new Txt(
            `${isExternal ? 'COMMANDE' : 'Transfert'} N°\nN° de série`
          ).width(120).end,
          new Txt(`:  ${transfert.ref}`).alignment('left').width(100).end,
        ]).width('30%').end,
        new Txt(`Date: ${transfert.date.toLocaleString()}`)
          .bold()
          .alignment('right').end,
      ]).end
    );

    // pdf.add(
    //   new Table(this.addGlasses(order.products))
    //     .widths(['25%', '15%', '15%', '15%', '15%', '15%'])
    //     .margin([0, 20]).end
    // );

    pdf.add(
      new Table(
        super.addAll(
          transfert.products.filter(p=>p.isRepeated!=true).map(
            (e) =>
          {
            return  <ProductToPrint>{
                ...e,
                quantity: e.m2 ?? e.ml ?? e.count ?? e.quantity,
              }}
          ),
          true
        )
      )
        .widths(['45%', '15%', '20%', '20%'])
        .margin([0, 20]).end
    );

    pdf.add([
      {
        columns: [
          [
            new Txt(NUM_TO_WORDS).bold().width('auto').margin([15, 0, 0, 5])
              .end,
            new Txt(numToWords(order.total_ttc))
              .margin([15, 0, 0, 5])
              .width('auto').end,
            {
              margin: [15, 0, 0, 5],
              table: {
                body: [
                  [
                    {
                      text: PAYMENT_METHOD,
                      bold: true,
                      decoration: 'underline',
                    },
                  ],
                  [{ text: PAYMENT_PERC, bold: true }],
                ],
              },
            },
            new Txt(OFFRE_VALID).margin([15, 0, 0, 5]).end,
          ],
          {
            width: 'auto',
            table: {
              widths: [110, 110],
              body: [
                [
                  { text: 'Total HT', style: 'headerLeft' },
                  { text: order.total_ht.toFixed(2) },
                ],
                [{ text: 'TVA', style: 'headerLeft' }, { text: order.total_tax.toFixed(2) }],
                [
                  { text: 'Total TTC', style: 'headerLeft' },
                  { text: order.total_ttc.toFixed(2) },
                ],
              ],
              alignment: 'right',
            },
          },
          // { width: '*', text: '' },
        ],
        absolutePosition: { y: 680 },
      },
    ]);
    pdf.create().open();
  }

  addGlasses(products: any[]) {
    const table = [
      ['Code', 'Qte', 'Largeur', 'Hauteur', 'M2', 'ML'].map((e) => ({
        text: e,
        style: 'header',
      })),
    ];
    // Filter only Glasses and client articles
    products = products.filter((e:Product_draft) =>
      ['Verre', 'Article_Client'].includes(e.type)&&e.isRepeated!=true
    );
    const map = new Map<string, Array<any>>();
    products.forEach((item) => {
      const row = [
        item.product_code,
        item.count ?? item.quantity,
        item.width,
        item.heigth,
        item.m2,
        item.ml,
      ];
      if (!map.has(item.product_code)) map.set(item.product_code, [row]);
      else map.get(item.product_code).push(row);
    });

    map.forEach((value, key) => {
      table.push(
        ...value.map((e) =>
          e.map((field) =>
            typeof field === 'number' ? field.toFixed(2) : field
          )
        )
      );
      table.push([
        '',
        '',
        '',
        '',
        value.reduce((pre, curr) => pre + curr[4], 0).toFixed(2),
        value.reduce((pre, curr) => pre + curr[5], 0).toFixed(2),
      ]);
    });
    return table;
  }
}
