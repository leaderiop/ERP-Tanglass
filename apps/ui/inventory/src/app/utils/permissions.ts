import { ROLES } from '@tanglass-erp/store/app';
import { ErpPermissions } from '@tanglass-erp/ag-grid';

export const WarehousePermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true }],
  [ROLES.user, { add: false, delete: false, update: false}],
  [ROLES.commercial, { add: false, delete: false, update: false }],
  [ROLES.caissier, { add: false, delete: false, update: false }],
  [ROLES.magazinier, { add: false, delete: false, update: false, }],
  [ROLES.responsable_pv, { add: false, delete: false, update: false }],
  [ROLES.comptable, { add: true, delete: true, update: true }],
]);

export const AccessoryInStockPermissions = new Map<ROLES, ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false}],
    [ROLES.commercial, { add: false, delete: false, update: false }],
    [ROLES.caissier, { add: false, delete: false, update: false }],
    [ROLES.magazinier, { add: true, delete: true, update: true, }],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
  ]);
  
  export const GlassInStockPermissions = new Map<ROLES, ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false}],
    [ROLES.commercial, { add: false, delete: false, update: false }],
    [ROLES.caissier, { add: false, delete: false, update: false }],
    [ROLES.magazinier, { add: false, delete: false, update: false, }],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
  ]);
  export const ConsumablenStockPermissions = new Map<ROLES, ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false}],
    [ROLES.commercial, { add: false, delete: false, update: false }],
    [ROLES.caissier, { add: false, delete: false, update: false }],
    [ROLES.magazinier, { add: true, delete: true, update: true }],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
  ]);

  export const StockAdjustementStockPermissions = new Map<ROLES, ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false}],
    [ROLES.commercial, { add: false, delete: false, update: false }],
    [ROLES.caissier, { add: false, delete: false, update: false }],
    [ROLES.magazinier, { add: true, delete: true, update: true }],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
  ]);

  export const TransfertPermissions = new Map<ROLES, ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false}],
    [ROLES.commercial, { add: false, delete: false, update: false }],
    [ROLES.caissier, { add: false, delete: false, update: false }],
    [ROLES.magazinier, { add: true, delete: true, update: true }],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
  ]);