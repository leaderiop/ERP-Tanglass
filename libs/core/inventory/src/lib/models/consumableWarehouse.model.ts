import { Warehouse } from './warehouse.model';
import { ProductItem } from './shared.models';

export interface ConsumableWarehouse{
id:number;
substance: SubstanceConsumable;
warehouse:Warehouse;
quantity:number;
}

export interface SubstanceConsumable {
    productConsumable?: ProductItem;
    consomable?: PartialConsumable
}
export interface PartialConsumable {
    id: string;
    category: string;
}
