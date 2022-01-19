import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';

export interface InsertedAccessory {
    draft_id?: number;
    product_code?: string;
    label?: string;
    quantity: number;
    price?: number;
    company_name?: string;
    company_id?: string;
    warehouse_id?: string;
    substance_id?: string;
    unit?: string;
    type?: Sales_Product_Type_Enum;
    quota?:number;
  }