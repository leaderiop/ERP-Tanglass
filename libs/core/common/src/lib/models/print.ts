export interface ProductToPrint {
  label: string;
  product_code: string;
  type: string;
  quantity: number;
  price: number;
  total_price: number;
  [key: string]: any;
}

export interface TransfertToPrint {
  ref: number;
  date: Date;
  deadline: string;
  company: string;
  fromSalePoint: string;
  toSalePoint: string;
  items: TransfertItemToPrint[];
}

export interface TransfertItemToPrint {
  quantity: number;
  substance: {
    code: string;
    label: string;
    price: string;
    unit: string;
  };
}
