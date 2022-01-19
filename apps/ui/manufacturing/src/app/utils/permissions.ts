import { ROLES } from '@tanglass-erp/store/app';
import { ErpPermissions } from '@tanglass-erp/ag-grid';

export const JobOrderPermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true }],
  [ROLES.user, { add: false, delete: false, update: false}],
  [ROLES.commercial, { add: false, delete: false, update: false }],

  [ROLES.caissier, { add: false, delete: false, update: false }],
  [ROLES.magazinier, { add: false, delete: false, update: false, }],
  [ROLES.responsable_pv, { add: false, delete: false, update: false }],
  [ROLES.comptable, { add: false, delete: false, update: false }],
]);










