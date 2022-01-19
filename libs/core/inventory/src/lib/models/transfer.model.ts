//for the transfer ordered item data

export interface OrderItem {
    id?: string;
    quantity: number;
    status?: string;//pending or delivered
    substance: ItemTransfer;
    total_deliveries: number;
    deliveries: Transfered[]
}
//for the quantity of  items  that are transfered

export interface Transfered {
    id: string;
    date: Date;
    quantity: number;
    status?: string// ready or out
    confirmed?: boolean;
}
//for the type and data  of  substances  to transfer

export interface ItemTransfer {
    productGlass?: ProductTransfer
    productAccessory?:ProductTransfer
}




export interface ProductTransfer {
    code?: string;
    label?: string;
}

export interface insertedTransfer {
    id: string;
    date: Date;
    quantity: number;
    status:string
}
