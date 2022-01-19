import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { OrderPrint } from '../utils/invoice/order-print';
import { DeliveryPrint } from '../utils/invoice/delivery-print';
import { JoborderPrint } from '../utils/invoice/joborder-print';
import { ProductToPrint } from '../models/print';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { applyMixins } from 'rxjs/internal-compatibility';
import { InvoicePrint } from '../utils/invoice/invoice-print';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class InvoiceGeneratorService implements OrderPrint, DeliveryPrint, JoborderPrint, InvoicePrint {
  constructor() {}

  initialize_pdf: (landscape?: boolean) => PdfMakeWrapper;

  addGlasses: (products: any[]) => any;

  addAll: (products: ProductToPrint[]) => any[];

  generateDeliveryLinePDF: (delivery) => void;

  generateInvoicePDF: (invoice) => void;

  generateOrderPDF: (order, isQuotation?: boolean) => void;

  generateJobOrder(jobOrder, jobItems: any[]): void {
  }

}

applyMixins(InvoiceGeneratorService, [OrderPrint, DeliveryPrint, JoborderPrint, InvoicePrint]);
