//for company/warehouse/salePoint name

export interface ShortFeature {
  id?: string;
  name: string;
  companyid?: string; //for warehouse
}
// for sales product
export interface Product {
  code: string;
  label: string;
  price: number;
  priceMax: number;
  priceMin: number;
  unit: string;
}

export interface ShortProvider {
  code?: string;
  name: string;
}

export interface ShortWarehouse {
  id?: string;
  name: string;
  companyid?: string; //for warehouse
  company?: { name: string };
}

export interface PartialPOS {
  id?: string;
  name: string;
  cash_boxes?: Array<{ id: number; name: string }>;
  isPrincipale: boolean;
  warehouses?: ShortWarehouse[];
}
