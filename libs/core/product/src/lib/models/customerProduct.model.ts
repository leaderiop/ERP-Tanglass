export interface CustomerProduct {
    id: string;
    thickness: number;
    product: {
        code: string;
        label: string;
    }
}
export interface insertCustomerItem {
    code:string;
    label:string;
    thickness:number
}
