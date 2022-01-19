import { SalesCompany, SalesCustomer } from './quotation.model';
import { Product_draft } from './product.model';
import { Amount } from './amount.model';

export interface Order {
  id: number;
  draft_id: number;
  customer: SalesCustomer;
  contact_id?: string;
  delivery_status: string;
  payment_status: string;
  date?: Date;
  deadline?: Date;
  company: SalesCompany;
  total_ttc: number;
  total_tax: number;
  total_ht: number;
  products?: Product_draft[];
  ref?: string;
  ref_num?: number;
  salepoint?: { name: string };
}

export interface DetailedOrder extends Order {
  draft_status: string;
  deliveries?:Delivery[]
}

export interface InsertedOrder {
  id: number;
  draft_id: number;
  customer_id: string;
  contact_id?: string;
  date?: Date;
  deadline?: Date;
  company_id: string;
  total_ttc: number;
  total_tax: number;
  total_ht: number;
  products: Product_draft[];
  amounts: Amount[];
}

export interface UpdateOrder {
  order_id: number;
  total_ttc: number;
  total_tax: number;
  total_ht: number;
  amounts: Amount[];
}

interface Delivery{
  id:string
  ref?:string;
  ref_num?:number;
  amount_ht:number;
  amount_ttc:number;
  amount_tva:number;
  client?:{
    code?:string;
    name?:string;
  }
  company?:{
    name?:string;
  }
  createdAt:Date;
  payment_method:string;
  isReturned:boolean;
  delivery_lines: {
    product_draft :Product_draft;
    delivered:number;
    amount:number;
  }[]
}
