import { DeliveryStatus, PaymentMethod } from '../enums/enums';
import { MetaData } from '@tanglass-erp/core/common';
import { Company } from '@tanglass-erp/core/product';
import { Product_draft } from './product.model';

export interface DeliveryForm extends MetaData {
  id: string;
  order_id: number;
  status: DeliveryStatus | string;
  predicted_date: Date;
  isReturned: boolean;
  client: {
    name: string;
    mail?: string;
    phone?: string;
  };
  company: Company;
  contact?: {
    name: string;
    mail?: string;
    phone?: string;
  };
  ref?: String;
  // delivery_lines: DeliveryLine[];
  payment_method: PaymentMethod | string;
  amount_ttc: number;
  amount_ht: number;
  amount_tva: number;
}

export interface InsertedDeliveryForm extends MetaData {
  id?: string;
  order_id: number;
  status: DeliveryStatus;
  predicted_date: Date;
  isReturned?: boolean;
  client_id: string;
  company_id: string;
  contact_id: string;
  delivery_lines?: Array<DeliveryLine>;
  payment_method: PaymentMethod;
  amount_ttc: number;
  amount_tva: number;
  amount_ht: number;

  // Extra fields needed to print deliveryLine
  ref?: string;
  ref_num?: number;
  client?: {
    name: string;
    mail?: string;
    phone?: string;
    code?: string;
  };
  company?: Company;
  contact?: {
    name: string;
    mail?: string;
    phone: string;
  };
  order?: {
    ref?: string;
    ref_num?: number;
  };
}

export interface InsertedDeliveryLine {
  id?: string;
  product_draft_id: any;
  quantity: number;
  delivered: number;
  amount?: number;
  toDeliver?: number; // For Form purpose only
}

export interface DeliveryLine {
  id?: string;
  product_draft_id: any;
  product?: {
    type: string;
    label: string;
    product_code: string;
    price: number;
    quantity: number;
    count?: number;
    delivered?: number;
  };
  delivered: number;
  amount?: number;
  toDeliver?: number; // For Form purpose only
}

export type deliveryFilter = {
  dateStart?: Date;
  dateEnd?: Date;
  status?: string;
};

export interface OrderDelivery {
  amount: number;
  delivered: number;
  id: string;
  product_draft: Product_draft;
}
