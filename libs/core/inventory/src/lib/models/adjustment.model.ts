export interface AdjustmentDB {
  id: string;
  ref?: number;
  date: Date;
  newQuantity: number;
  oldQuantity: number;
  reason: string;
  userProfile?: {
    username:string;
    role:string;
  };
  warehouse_substance?: Warehouse_Substance;
}

interface Warehouse_Substance {
  substance: Substance;
  warehouse: Warehouse;
}

interface Substance {
  id: string;
  type: string;
  productAccessory?: Product;
  productConsumable?: Product;
  productGlass?: Product;
}
interface Warehouse {
  id: string;
  name: string;
  company: {
    name: string;
  };
}

interface Product {
  code?: string;
  label?: string;
  unit?: string;
}

export interface Adjustment {
  id: string;
  ref?: number;
  date: Date;
  newQuantity: number;
  oldQuantity: number;
  reason: string;
  createdBy?: string;
  role:string;
  product: Product;
  type: string;
  substanceid: string;
  warehouseid: string;
  warehouseName: string;
  companyName: string;
}

export interface InsertedAdjustment {
  newQuantity: number;
  oldQuantity: number;
  reason: string;
  createdBy?: string;
  substance_id: string;
  warehouse_id: string;
  note?: string;
}

export interface SubstanceWarehouse {
  quantity: number;
  quantity_min?: number;
  quantity_planned?: number;
  substanceid: string;
  warehouseid: string;
}

export interface DetailedSubstanceWarehouseDB {
  quantity: number;
  quantity_min?: number;
  quantity_planned?: number;
  substance: Substance;
  warehouse: Warehouse;
  stock_adjustments: AdjustmentDB[];
}
