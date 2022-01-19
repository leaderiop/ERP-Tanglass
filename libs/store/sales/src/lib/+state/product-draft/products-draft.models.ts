import { InsertedProduct, Product_draft } from '@tanglass-erp/core/sales';

export class Amount {
  company_name?: string;
  total_ht: number = 0;
  total_ttc: number = 0;
  total_tax: number = 0;
}
export class Product {
  id: string;
  product_code?: string;
  label?: string;
  count?: number;
  //heigth?: number;
  //width?: number;
  m2?: number = 0;
  ml?: number = 0;
  unit?: string;
  price?: number;
  quantity?: number = 0;
  total_price?: number = 0;
  company_name?: string;
  warehouse_id?: string;
  type?: string;
  dimensions?:Dimension[];
}
export class ProductGroups {
  glasses: Product_draft[];
  articles: Product_draft[];
  repeated?: Product_draft[];
}

export class Bis {
  glass: InsertedProduct;
  services: InsertedProduct[];
  consumables: InsertedProduct[];
}
export class Dimension{
  count: number;
  heigth: number;
  width: number;
}