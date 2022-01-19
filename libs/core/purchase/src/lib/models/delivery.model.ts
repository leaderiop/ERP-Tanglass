export interface PurchaseDelivery {
  id?: number;
  date: Date;
  ref?: string;
  provider: Provider;
  delivery_items?: PurchaseItem[];
}
interface Provider {
  id: string;
  code?: string;
  name: string;
  phone: string;
}

export interface PurchaseItem {
  id?:string;
  substance_id: string;
  quantity: number;
  warehouse: Warehouse;
  code: string;
  label: string;
  cost?: number;
  unit: string;
}
interface Warehouse {
  id: string;
  name: string;
  company: {
    name: string;
  };
}

export interface InsertedPurchaseDelivery {
  date: Date;
  provider_id: string;
  items: PurchaseItem[];
}
export interface InsertedPurchaseItem {
  substance_id: string;
  quantity: number;
  warehouse_id: string;
  code: string;
  label: string;
  cost?: number;
  unit: string;
}