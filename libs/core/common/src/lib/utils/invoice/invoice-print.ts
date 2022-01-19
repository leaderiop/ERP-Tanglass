import { PDFCommon } from './pdf';
import { Columns, Table, Txt } from 'pdfmake-wrapper';
import { CITY, CODE_CLIENT, DELIVERY_LINE, INVOICE, PAYMENT_METHOD } from '../resources';

export class InvoicePrint extends PDFCommon {

  generateInvoicePDF(invoice) {
    const pdf = super.initialize_pdf();
    // Company name and address
    pdf.add(
      new Txt(invoice.client.name).fontSize(30).bold().alignment('right').end
    );
    pdf.add(new Txt(CITY).alignment('right').end);

    // Delivery Line Ref + verticale line
    const invoice_splits = invoice.ref.split('/');
    const invoice_ref = `${invoice_splits[2]}-${invoice_splits[1]}`;
    pdf.add(new Txt(`${INVOICE}: ${invoice_ref}`).fontSize(20).bold().end);
    pdf.add({
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [[''], ['']],
      },
      layout: 'headerLineOnly',
    });

    // date ,customer and deliveries

    const deliveries = invoice.deliveries.map((e) => {
      const delivery_splits = e.delivery.ref.split('/');
      const delivery_ref = `${delivery_splits[2]}-${delivery_splits[1]}`;
      return delivery_ref
    }).join(', ');
    pdf.add(
      new Columns([
        new Columns([
          new Txt(`Date\n${PAYMENT_METHOD}\n${DELIVERY_LINE}`).width(120).end,
          new Txt(
            `:  ${invoice.date.toLocaleString()}\n :  ${
              invoice.payment_method
            }\n :  ${deliveries}`
          )
            .alignment('left')
            .width(100).end,
        ]).width('30%').end,
        new Txt(`${CODE_CLIENT}: ` + invoice.client?.code ?? '').alignment(
          'right'
        ).end,
      ]).margin([0, 20]).end
    );

    pdf.add(
      new Table(
        super.addAll(
          invoice.invoice_lines.map((e) => ({
            label: e.product_label,
            quantity: e.m2 ?? e.ml ?? e.count ?? e.quantity,
            price: e.unit_price,
            total_price: e.total,
            type: e.product_type,
            product_code: e.product_code,
            m2: e.m2 || e.ml,
          })).filter(e => !!e.total_price)
        )
      )
        .widths(['45%', '15%', '20%', '20%'])
        .margin([0, 20]).end
    );

    pdf.add([
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            table: {
              widths: [110, 110],
              body: [
                [
                  { text: 'Total HT', style: 'headerLeft' },
                  { text: invoice.amount_ht.toFixed(2) },
                ],
                [
                  { text: 'TVA', style: 'headerLeft' },
                  { text: invoice.amount_tva.toFixed(2) },
                ],
                [
                  { text: 'Total TTC', style: 'headerLeft' },
                  { text: invoice.amount_ttc.toFixed(2) },
                ],
              ],
              alignment: 'right',
            },
          },
          // { width: '*', text: '' },
        ],
        absolutePosition: { y: 700 },
      },
    ]);
    pdf.create().open();
  }
}
