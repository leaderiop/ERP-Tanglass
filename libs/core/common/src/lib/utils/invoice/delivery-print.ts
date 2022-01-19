import { PDFCommon } from './pdf';
import { Columns, Table, Txt } from 'pdfmake-wrapper';
import { CITY, CODE_CLIENT, COMMAND, DELIVERY_LINE, PAYMENT_METHOD ,NUM_TO_WORDS, OFFRE_VALID, PAYMENT_PERC } from '../resources';
import { numToWords } from '../utilities';
export class DeliveryPrint extends PDFCommon {

  generateDeliveryLinePDF(delivery) {
    const pdf = super.initialize_pdf();
    // Company name and address
    pdf.add(
      new Txt(delivery.client.name).fontSize(30).bold().alignment('right').end
    );
    pdf.add(new Txt(CITY).alignment('right').end);

    // Delivery Line Ref + verticale line
    const delivery_splits = delivery.ref.split('/');
    const delivery_ref = `${delivery_splits[2]}-${delivery_splits[1]}`;
    pdf.add(
      new Txt(`${DELIVERY_LINE}: ${delivery_ref}`).fontSize(20).bold().end
    );
    pdf.add({
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [[''], ['']],
      },
      layout: 'headerLineOnly',
    });

    // date ,customer and command
    pdf.add(
      new Columns([
        new Columns([
          new Txt(`Date\n${PAYMENT_METHOD}\n${COMMAND}`).width(120).end,
          new Txt(
            `:  ${delivery.createdAt.toLocaleString()}\n :  ${
              delivery.payment_method
            }\n :  ${delivery.order.ref}`
          )
            .alignment('left')
            .width(100).end,
        ]).width('30%').end,
        new Txt(`${CODE_CLIENT}: ` + delivery.client.code ?? '').alignment(
          'right'
        ).end,
      ]).margin([0, 20]).end
    );

    pdf.add(
      new Table(
        super.addAll(
          delivery.delivery_lines.map((e) => ({
            label: e.product.label,
            quantity: e.delivered,
            price: e.product.price || 0,
            total_price: e.amount,
            type: e.product.type,
            product_code: e.product.product_code,
          })).filter(e => !!e.total_price)
        )
      )
        .widths(['45%', '15%', '20%', '20%'])
        .margin([0, 20]).end
    );
    // pdf.add([
    //   {
    //     columns: [
    //       { width: '*', text: '' },
    //       {
    //         width: 'auto',
    //         table: {
    //           widths: [110, 110],
    //           body: [
    //             [
    //               { text: 'Total HT', style: 'headerLeft' },
    //               { text: delivery.amount_ht.toFixed(2) },
    //             ],
    //             [
    //               { text: 'TVA', style: 'headerLeft' },
    //               { text: delivery.amount_tva.toFixed(2) },
    //             ],
    //             [
    //               { text: 'Total TTC', style: 'headerLeft' },
    //               { text: delivery.amount_ttc.toFixed(2) },
    //             ],
    //           ],
    //           alignment: 'right',
    //         },
    //       },
    //       // { width: '*', text: '' },
    //     ],
    //     absolutePosition: { y: 700 },
    //   },
    // ]);
    pdf.add([
      {
        columns: [
          [
            new Txt(NUM_TO_WORDS).bold().width('auto').margin([15, 0, 0, 5])
              .end,
            new Txt(numToWords(delivery.amount_ht))
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
          ],
          {
            width: 'auto',
            table: {
              widths: [110, 110],
              body: [
                [
                  { text: 'Total HT', style: 'headerLeft' },
                  { text: delivery.amount_ht.toFixed(2) },
                ],
                [{ text: 'TVA', style: 'headerLeft' }, { text: delivery.amount_tva.toFixed(2) }],
                [
                  { text: 'Total TTC', style: 'headerLeft' },
                  { text: delivery.amount_ttc.toFixed(2) },
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
}
