import { Sales_Product_Type_Enum } from '@tanglass-erp/infrastructure/graphql';

export interface InsertBisItem {
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
    type?: string | Sales_Product_Type_Enum;
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
  }