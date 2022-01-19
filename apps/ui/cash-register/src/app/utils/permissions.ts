import { ROLES } from '@tanglass-erp/store/app';
import { ErpPermissions } from '@tanglass-erp/ag-grid';

export const CashPermissions = new Map<ROLES, ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false}],
    [ROLES.commercial, { add: true, delete: true, update: true }],
    [ROLES.caissier, { add: true, delete: true, update: true }],
    [ROLES.magazinier, { add: false, delete: false, update: false}],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
  ]);
