import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';
import { Product_draft, Product_sale } from './product.model';
export interface InsertedGlass {
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
  dimensions: Dimension[];
}

interface Dimension {
  count: number;
  width: number;
  heigth: number;
}

export interface EditGlassUI {
  oldGlass: Product_draft;
  count: number;
  heigth: number;
  width: number;
  price: number;
  services?: Product_draft[];
}
export interface EditGlassDB {
  count: number;
  heigth: number;
  width: number;
  price: number;
  m2: number;
  ml: number;
  quantity: number;
}
