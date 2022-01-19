export interface Payment {
  id?: string;
  order_id?: number;
  company?: {
    id: string;
    name: string;
  };
  amount: number;
  date?: Date;
  deadline?: string;
  customer_id?: string;
  payment_method?: string;
}
