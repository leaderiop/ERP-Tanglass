



export interface ProductItem {
    code?: string;
    label?: string;
    price?: number;
    unit?: string;
}


export interface PartialData {
    name: string;
    id?: string;
}


export interface SubstanceStocksDetails {
    sum_quantity: number;
    max_quantity: number;
    min_quantity: number;
    count: number
    code: string;
    label: string;
    price: number;
    unit: string;
    stocks: Stocks[]
  }
  export interface Stocks {
    quantity: number;
    name: string;
  }
  