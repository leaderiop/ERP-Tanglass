import { MetaData } from '@tanglass-erp/core/common';
import { Expenses } from './expenses';

export interface CashBox extends MetaData {
  id: number;
  name: string;
  salepoint_id: string;
  balance: number;
  expenses: Expenses[];
  payments;
}


export interface InsertedCashBox {
  name: string;
  salepoint_id: string;
}

export interface InsertedPayment {
  order_id?:number;
  company?:{
    name:string
  };
  amount:number;
  date?:Date;
  deadline?:string;
  customer_id?:string;
  payment_method?:string;
}
