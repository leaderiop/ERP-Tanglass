import { PDFCommon } from './pdf';
import { Columns, Txt } from 'pdfmake-wrapper';
import { JO_TABLE_HEADER, JOB_ORDER } from '../resources';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export class JoborderPrint extends PDFCommon {


  generateJobOrder(jobOrder, jobItems: any[]) {
    const pdf = super.initialize_pdf();
    pdf.add(
      new Txt(JOB_ORDER)
        .fontSize(20)
        .bold()
        .decoration('underline')
        .alignment('right').end
    );

    pdf.add(
      new Columns([
        new Columns([
          new Txt([
            new Txt('N° B.T: ' + jobOrder.ref).bold().end,
            new Txt(
              '\n' +
              format(new Date(jobOrder.date), 'MM/dd/yyyy HH:mm:ss', {
                locale: fr,
              })
            ).end,
          ])
            .width(150)
            .alignment('left').end,
        ]).width('50%').end,
        new Txt('N° B.C: ' + jobOrder.order_ref).alignment('center').bold().end,
      ]).margin([0, 20]).end
    );

    const jobItemsMap = jobItems.reduce((acc, curr) => {
      if (acc.has(curr.item)) {
        acc.get(curr.item).dimensions.push(curr.dimensions);
        acc.get(curr.item).counts.push(curr.count);
      } else
        acc.set(curr.item, {
          ...curr,
          dimensions: [curr.dimensions],
          counts: [curr.count],
        });

      return acc;
    }, new Map<string, any>());

    const jobItemsAdapted = [...jobItemsMap.values()].map((e) => [
      [e.item],
      e.counts.map((count, index) => [
        e.dimensions[index] + ' ------------------> ' + count,
      ]),
      // [e.dimensions + ' ------------------> ' + e.count],
    ]);
    if (jobItemsAdapted.length) {
      jobItemsAdapted
        .slice(1)
        .forEach((value) => jobItemsAdapted[0].push(...value));
    }

    pdf.add({
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [{ text: JO_TABLE_HEADER, style: 'header' }],
          [jobItemsAdapted[0]],
        ],
      },
    });

    pdf.create().open();
  }

}
