import { MetaData } from '@tanglass-erp/core/common';

export interface Expenses extends MetaData {
  id: number;
  name: string;
  category: string;
  amountSpent: number;
  note?: string;
  employee_id?: string;
  employee?: {
    username?: string;
    firstname?: string;
    lastname?: string;
  };
}


export interface InsertedExpenses {
  name: string;
  category: string;
  amountSpent: number;
  note?: string;
  cash_box_id: number;
  employee_id?: string;
}

export interface ExpensesCategory {
  key: string;
  value: string;
}
