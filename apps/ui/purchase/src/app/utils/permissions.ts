import { ROLES } from "@tanglass-erp/store/app";
import { ErpPermissions } from "@tanglass-erp/ag-grid";
import { rolesDirection } from "@tanglass-erp/core/management";


 export const PurchasePermissions=new Map<rolesDirection,ErpPermissions>([
    [ROLES.admin, { add: true, delete: true, update: true }],
    [ROLES.user, { add: false, delete: false, update: false }],
    [ROLES.commercial,{ add: false, delete: false, update: false }],
    [ROLES.caissier, { add: false, delete: false, update: false}],
    [ROLES.magazinier,  { add: true, delete: true, update: true }],
    [ROLES.responsable_pv, { add: true, delete: true, update: true }],
    [ROLES.comptable, { add: true, delete: true, update: true }],
    ])