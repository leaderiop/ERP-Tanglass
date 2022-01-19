import { InsertedProduct, Product_draft } from './product.model';
import { SalesCompany, SalesCustomer } from './quotation.model';

export interface Draft {
  id: number;
  status?: string;
  customer_id?: string;
  contact_id?: string;
  date?: Date;
  company_id?: string;
  products?: Product_draft[];
}

export interface DraftDetailed {
  id: number;
  status?: string;
  customer?: SalesCustomer;
  contact_id?: string;
  date?: Date;
  company?: SalesCompany;
  products?: InsertedProduct[];
}
