import { Accessory, Glass } from '@tanglass-erp/core/product';
import { DetailedTransferOrder, TransferOrder } from '../models/transrefOrder.model';
import { Warehouse } from '../models/warehouse.model';


//list of transfers orders
export interface TransferOrderVM {
    transfers:TransferOrder[];
    loading:boolean;
    error?: string;
}


// transfer order  fiche
export interface DetailedTransferOrderVM{
    detailedTransfer:DetailedTransferOrder;
    loading:boolean;
    error?:string;
}

// transfer order creation
export interface creationTransferOrderVM{
    warehouses:Warehouse[];
    glasses:Glass[];
    accessories:Accessory[];
    loading:boolean;
    error?:string;
}
