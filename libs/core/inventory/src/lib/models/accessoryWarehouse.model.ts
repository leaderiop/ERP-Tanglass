import { Warehouse } from './warehouse.model';
import { ProductItem } from './shared.models';


export interface AccessoryWarehouse {
  id:number;
  substance: SubstanceAccessory;
  warehouse: Warehouse;
  quantity: number;
}

export interface SubstanceAccessory {
  productAccessory?: ProductItem;
  accessory?: PartialAccesory
}
export interface PartialAccesory {
  id: string;
  category: string;
}

