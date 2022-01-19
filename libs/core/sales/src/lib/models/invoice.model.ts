import { Company } from '@tanglass-erp/core/product';
import { PaymentMethod } from '@tanglass-erp/core/sales';
import { MetaData } from '@tanglass-erp/core/common';

export interface Invoice extends MetaData {
  id?: string;
  client: {
    name: string;
    mail?: string;
  };
  company?: Company;
  contact?: {
    name: string;
    mail?: string;
    phone: string;
  };
  payment_method: PaymentMethod | string;
  date: Date;
  ref?: String;
  amount_ttc: number;
  amount_ht: number;
  amount_tva: number;
  deliveries?: Array<{
    delivery_id: string;
  }>;
}

export interface InsertedInvoice {
  id?: string;
  client_id: string;
  payment_method: PaymentMethod | string;
  company_id: string;
  contact_id?: string;
  date: Date;
  deliveries: Array<{
    delivery_id: string;
  }>;
  invoice_lines: Array<InvoiceLine>;
  amount_ttc: number;
  amount_ht: number;
  amount_tva: number;
}

export interface UpdatedInvoice extends InsertedInvoice {
  id: string;

  // Extra Fields
  ref?: string;
  ref_num?: number;
  client?: {
    name: string;
    phone?: string;
    mail?: string;
    code?: string;
  };
  company?: Company;
  contact?: {
    name: string;
    mail?: string;
    phone: string;
  };
  deliveries: Array<{
    delivery?: {
      ref_num: number;
      ref: string;
    };
    delivery_id: string;
  }>;
}

export interface InvoiceLine {
  id?: string;
  invoice_id?: string;
  product_code: string;
  product_label: string;
  product_type: string;
  total: number;
  quantity: number;
  unit_price: number;
}

export type invoiceFilter = {
  dateStart?: Date;
  dateEnd?: Date;
};
