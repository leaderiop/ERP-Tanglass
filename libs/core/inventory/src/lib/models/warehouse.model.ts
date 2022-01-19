import { MetaData } from '@tanglass-erp/core/common';
import { PartialData } from './shared.models';

export interface Warehouse {
  id: string;
  name: string;
  company: PartialData;
  salesPoint?: PartialData;
}

export interface InsertedWarehouse {
  id?: string;
  companyid: string;
  name: string;
  salesPointid: string;
}

export interface DetailedWarehouse extends MetaData {
  id: string;
  name: string;
  company: PartialData;
  salesPoint?: PartialData;
}
