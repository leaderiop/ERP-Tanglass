import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { ProductToPrint } from '../../models/print';
import { arrToFixed } from '../utilities';


export abstract class PDFCommon {

  initialize_pdf(landscape: boolean = false):PdfMakeWrapper {
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageOrientation(landscape?'landscape':'portrait');
    pdf.styles({
      header: {
        bold: true,
        alignment: 'center',
      },
      headerLeft: {
        bold: true,
        alignment: 'left',
      },
    });
    return pdf;
  }


  addAll(products: ProductToPrint[], groupByAccessory=false) {
    // Adapt
    const accessories = ['ACCESSOIRES', 0, '', 0]; // Initialize accessories
    products.forEach((value) => {
      value.price *= 5 / 6;
      value.total_price = value.price * value.quantity;
      value.price = parseFloat(value.price.toFixed(2));
      value.total_price = parseFloat(value.total_price.toFixed(2));
    });

    // Header
    const table: any[] = [
      ['Désignation', 'Qté M2/ML', 'PU', 'Montant H.T'].map((e) => ({
        text: e,
        style: 'header',
      })),
    ];

    // Group By glass
    const map = new Map<string, Array<any>>();

    products
      .filter((e) => ['Verre', 'Accessoire', ''].includes(e.type))
      .forEach((item) => {
        if (item.type === 'Accessoire' && groupByAccessory) {
          // Accessory type
          (accessories[1] as number) += item.quantity;
          // (accessories[2] as number) += item.price;
          (accessories[3] as number) += item.total_price;
          return;
        }
        const row = [item.label, item.quantity, item.price, item.total_price];
        if (map.has(item.product_code)) {
          map.get(item.product_code)[1] += row[1];
          map.get(item.product_code)[3] += row[3];
        } else map.set(item.product_code, row);
      });

    // Services
    products
      .filter((e) => ['Service', 'Consommable'].includes(e.type))
      .forEach((item) => {
        if (item.label.toLowerCase().includes('pose')) {
          accessories[0] += 'ET POSE';
          (accessories[1] as number) += item.quantity;
          (accessories[2] as number) += item.price;
          (accessories[3] as number) += item.total_price;
        } else {
          const row = [item.label, item.quantity, item.price, item.total_price];
          if (map.has(item.product_code)) {
            map.get(item.product_code)[1] += row[1];
            map.get(item.product_code)[3] += row[3];
          } else map.set(item.product_code, row);
        }
      });

    map.forEach((value: any) => {
      arrToFixed(value, 2);
    });
    arrToFixed(accessories, 2);

    // Merge all on the table
    table.push(...Array.from(map.values()));
    if (accessories[3] !== "0.00") {
      table.push(accessories);
    }

    return table;
  }

}






