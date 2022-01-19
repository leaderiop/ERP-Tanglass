import {
  InsertedAccessoryDB,
  InsertedGlassDB,
  Product_draft,
} from './product.model';
import { Amount } from './amount.model';

export interface Quotation {
  id: number;
  draft_id: number;
  ref?: string;
  status?: string;
  customer: SalesCustomer;
  salepoint: { name: string };
  contact_id?: string;
  date?: Date;
  deadline?: Date;
  company: SalesCompany;
  total_ttc: number;
  total_tax: number;
  total_ht: number;
  products?: Product_draft[];
  ref_num?: number;
}

export interface SalesCustomer {
  id?: string;
  code?: string;
  name: string;
  phone: string;
}

export interface SalesCompany {
  id: string;
  name: string;
}

export interface InsertedQuotation {
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

export interface TransformedQuotation {
  draft_id: number;
  copierDraft_id: number;
  company_id: string;
  contact_id?: string;
  customer_id: string;
  date: Date;
  deadline?: Date;
  total_ht: number;
  total_tax: number;
  total_ttc: number;
  salepoint_id: string;
  quotation: Quotation;
}

export interface Transfert {
  draft_id: number;
  copierDraft_id: number;
  company_id: string;
  contact_id?: string;
  customer_id: string;
  salepoint_id: string;
  date: Date;
  deadline?: Date;
  total_ht: number;
  total_tax: number;
  total_ttc: number;
  glasses?: InsertedGlassDB[];
  accessories?: InsertedAccessoryDB[];
  consumables?: InsertedAccessoryDB[];
}
