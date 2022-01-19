import { MetaData } from '@tanglass-erp/core/common';
import { OrderItem } from './transfer.model';
import { PartialData, ProductItem } from './shared.models';

export interface TransferOrder {
    id: number;
    fromwarehouse: PartialData;
    towarehouse: PartialData;
    date: Date;
    deadline?: Date;
    status: string;
}

export interface DetailedTransferOrder extends MetaData {
    id: number;
    date: Date;
    deadline?: Date;
    status: string; // confirmed/ delivered /closed/suspended enum transferStatus
    fromwarehouse: PartialData;
    towarehouse: PartialData;
    items_count:number;
    items_sum:number;
    order_items: OrderItem[];

}


export interface InsertedTransferOrder {
    id?: number;
    substances: Item[];
    fromWarehouseid: string;
    toWarehouseid: string;
    date: string|Date;
    deadline?: string|Date;
}


export interface Item {
    substanceid: string;
    quantity: number;

}

export interface OrderDetails {
    fromwarehouse: string;
    towarehouse: string;
    id: number;
    date: Date;
    deadline: Date;
    item: ProductItem;
    quantity: number;
    status: string;
}
