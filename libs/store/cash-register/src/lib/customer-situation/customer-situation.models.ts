/**
 * Interface for the 'CustomerSituation' data
 */
export interface CustomerSituation {
  customer_id?: string;
  order_ref?: string;
  total_ttc?: number;
  paid?: number;
  credit?: number;
}
