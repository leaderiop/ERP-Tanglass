import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';
import { Product_draft } from './product.model';
export interface InsertedService {
  draft_id?: number;
  product_code?: string;
  label?: string;
  price?: number;
  company_name?: string;
  company_id?: string;
  warehouse_id?: string;
  substance_id?: string;
  unit?: string;
  isRepeated?: boolean;
  type?: Sales_Product_Type_Enum;
  quantity: number;
  glasses: Product_draft[];
  labelFactory: string;
}

export interface ReturningService {
  returning: Product_draft[];
  type?: Sales_Product_Type_Enum;
}
