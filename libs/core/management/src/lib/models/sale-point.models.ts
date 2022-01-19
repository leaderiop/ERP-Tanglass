import { UsersProfileForSalePoint } from './user.models';
import { MetaData } from '@tanglass-erp/core/common';

export interface SalePoint {
  id: string;
  address: string;
  email?: string;
  fax?: string;
  name: string;
  phone: string;
  isPrincipale: boolean;
}

export interface DetailedSalePoint extends MetaData {
  id: string;
  address: string;
  email?: string;
  fax?: string;
  name: string;
  phone: string;
  usersProfiles?: UsersProfileForSalePoint[];
  isPrincipale: boolean;
}

export interface SalePointForUser {
  name: string;
  phone: string;
  address: string;
  isPrincipale: boolean;
}
