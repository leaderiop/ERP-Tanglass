import { ROLES } from '@tanglass-erp/store/app';
import { ErpPermissions } from '@tanglass-erp/ag-grid';

const DeliveryPermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true, INVOICE: true }],
  [ROLES.user, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.commercial, { add: false, delete: false, update: false, INVOICE: false }],

  [ROLES.caissier, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.magazinier, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.responsable_pv, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.comptable, { add: true, delete: true, update: true, INVOICE: true }],
]);

const OrderPermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true }],
  [ROLES.user, { add: false, delete: false, update: false }],
  [ROLES.commercial, { add: true, delete: true, update: true }],
  [ROLES.caissier, { add: true, delete: true, update: true}],
  [ROLES.magazinier, { add: false, delete: false, update: false }],
  [ROLES.responsable_pv, { add: true, delete: true, update: true }],
  [ROLES.comptable, { add: true, delete: true, update: true }],
  ]
);

const DraftPermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true }],
  [ROLES.user, { add: false, delete: false, update: false }],
  [ROLES.commercial, { add: true, delete: true, update: true }],
  [ROLES.caissier, { add: true, delete: true, update: true}],
  [ROLES.magazinier, { add: false, delete: false, update: false }],
  [ROLES.responsable_pv, { add: true, delete: true, update: true }],
  [ROLES.comptable, { add: true, delete: true, update: true }],
  ]
);

const QuotationPermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true }],
  [ROLES.user, { add: false, delete: false, update: false }],
  [ROLES.commercial, { add: true, delete: true, update: true }],
  [ROLES.caissier, { add: true, delete: true, update: true}],
  [ROLES.magazinier, { add: false, delete: false, update: false }],
  [ROLES.responsable_pv, { add: true, delete: true, update: true }],
  [ROLES.comptable, { add: true, delete: true, update: true }],
  ]
);

const InvoicePermissions = new Map<ROLES, ErpPermissions>([
  [ROLES.admin, { add: true, delete: true, update: true, INVOICE: true }],
  [ROLES.user, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.commercial, { add: false, delete: false, update: false, INVOICE: false }],

  [ROLES.caissier, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.magazinier, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.responsable_pv, { add: false, delete: false, update: false, INVOICE: false }],
  [ROLES.comptable, { add: true, delete: true, update: true, INVOICE: true }],
  ]
);



export {
  DeliveryPermissions,
  DraftPermissions,
  InvoicePermissions,
  OrderPermissions,
  QuotationPermissions
};
