import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';

export interface Product_sale {
  draft_id?: number;
  product_code?: string;
  label?: string;
  count?: number;
  quantity?: number;
  price?: number;
  total_price?: number;
  delivered?: number;
  company_name?: string;
  company_id?: string;
  m2?: number;
  ml?: number;
  warehouse_id?: string;
  type?: Sales_Product_Type_Enum;
  substance_id?: string;
  unit?: string;
  dependent_id?: string;
  isRepeated?: boolean;
  status?: string;
  isLaunched?: boolean;
  labelFactory?: string;
}
export interface Product_draft {
  id: string;
  draft_id?: number;
  product_code?: string;
  label?: string;
  count?: number;
  quantity?: number;
  price?: number;
  total_price?: number;
  delivered?: number;
  company_name?: string;
  company_id?: string;
  m2?: number;
  ml?: number;
  warehouse_id?: string;
  type?: string | Sales_Product_Type_Enum;
  substance_id?: string;
  unit?: string;
  glass_draft?: {
    id: string;
  };
  consumable_draft?: {
    id: string;
    labelFactory?: string;
  };
  service_draft?: {
    id: string;
    labelFactory: string;
  };
  dependent_id?: string;
  isRepeated?: boolean;
  status?: string;
  isLaunched?: boolean;
}

export interface InsertedProduct {
  draft_id?: number;
  product_code?: string;
  label?: string;
  count?: number;
  width?: number;
  heigth?: number;
  quantity?: number;
  price?: number;
  total_price?: number;
  delivered?: number;
  company_name?: string;
  company_id?: string;
  m2?: number;
  ml?: number;
  warehouse_id?: string;
  substance_id?: string;
  unit?: string;
  glass_draft?: {
    id: string;
  };
  consumable_draft?: {
    id: string;
  };
  service_draft?: {
    id: string;
  };
  dependent_id?: string;
  isRepeated?: boolean;
  status?: string;
  isLaunched?: boolean;
  type: Sales_Product_Type_Enum;
  labelFactory: string;
}

export interface InsertedGlassDB {
  product_draft: {
    data: BasicGlass;
  };
  service_drafts?: {
    data: { labelFactory: string; product_draft: { data: InsertedService } }[];
  };
  consumable_drafts?: {
    data: {
      labelFactory: string;
      product_draft: { data: InsertedConsumable };
    }[];
  };
}
export interface BasicGlass {
  draft_id?: number;
  product_code?: string;
  label?: string;
  count?: number;
  width?: number;
  heigth?: number;
  quantity?: number;
  price?: number;
  total_price?: number;
  delivered?: number;
  company_name?: string;
  company_id?: string;
  m2?: number;
  ml?: number;
  warehouse_id?: string;
  substance_id?: string;
  unit?: string;
  dependent_id?: string;
  isRepeated?: boolean;
  status?: string;
  isLaunched?: boolean;
  type?: Sales_Product_Type_Enum;
}
export interface InsertedConsumable {
  draft_id?: number;
  product_code?: string;
  label?: string;
  count?: number;
  width?: number;
  heigth?: number;
  quantity?: number;
  price?: number;
  total_price?: number;
  delivered?: number;
  company_name?: string;
  company_id?: string;
  m2?: number;
  ml?: number;
  warehouse_id?: string;
  substance_id?: string;
  unit?: string;
  isRepeated?: boolean;
  status?: string;
  isLaunched?: boolean;
  type?: Sales_Product_Type_Enum;
  labelFactory?: string;
}

interface InsertedService {
  draft_id?: number;
  product_code?: string;
  label?: string;
  count?: number;
  width?: number;
  heigth?: number;
  quantity?: number;
  price?: number;
  total_price?: number;
  delivered?: number;
  company_name?: string;
  company_id?: string;
  m2?: number;
  ml?: number;
  warehouse_id?: string;
  substance_id?: string;
  unit?: string;
  isRepeated?: boolean;
  status?: string;
  isLaunched?: boolean;
  type?: Sales_Product_Type_Enum;
}

export interface InsertedAccessoryDB {
  product_draft: {
    data: {
      draft_id?: number;
      product_code?: string;
      label?: string;
      count?: number;
      width?: number;
      heigth?: number;
      quantity?: number;
      price?: number;
      total_price?: number;
      delivered?: number;
      company_name?: string;
      company_id?: string;
      m2?: number;
      ml?: number;
      warehouse_id?: string;
      substance_id?: string;
      unit?: string;
      status?: string;
      type?: Sales_Product_Type_Enum;
    };
  };
}

