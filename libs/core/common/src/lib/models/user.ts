import { rolesDirection } from "@tanglass-erp/core/management";
import { ShortWarehouse } from "./shortFeature.models";
export interface UserProfile {
  id: string;
  active: boolean;
  createdAt: Date;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  role?: rolesDirection|string;
  username?: string;
  SalesPointsid?: string;
  CIN?: string;
  SalesPoint?: {
    name: string;
    id: string;
    isPrincipale: boolean;
    warehouses:ShortWarehouse[];
  };
}
