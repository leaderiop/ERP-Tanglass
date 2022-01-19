import { DashboardQueryQuery } from '@tanglass-erp/infrastructure/graphql';
import { DashboardStats } from '../models/dashboard';

export function flattenObj(objtoAdapt, old = '', res = {}) {
  for (var key of Object.keys(objtoAdapt)) {
    if (key == '__typename') continue;
    if (typeof objtoAdapt[key] == 'object' && objtoAdapt[key] !== null) {
      old = key;
      flattenObj(objtoAdapt[key], old, res);
    } else {
      if (Object.keys(res).includes(key) && objtoAdapt[key] !== null) {
        res[old + '_' + key] = objtoAdapt[key];
        res[key];
      } else if (objtoAdapt[key] !== null) res[key] = objtoAdapt[key];
    }
  }
  return res;
}

export function adaptDashboardQuery(data: DashboardQueryQuery): DashboardStats {
  return {
    clients_count: data.contact_customer_aggregate.aggregate.count,
    users_count: data.management_userProfile_aggregate.aggregate.count,
    week_earning: data.sales_order_aggregate.aggregate.sum.total_ttc,
  };
}
