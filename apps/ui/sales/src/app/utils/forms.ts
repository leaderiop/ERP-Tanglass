import { MAXNUMBER, REQUIRED } from '@tanglass-erp/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Accessory, Consumable, CustomerProduct, Glass, Service } from '@TanglassStore/product/index';
import { Intermediate_Data } from './models';
import {
  DeliveryStatus,
  InsertedDeliveryForm,
  InsertedInvoice,
  PaymentMethod,
  Product_draft
} from '@tanglass-erp/core/sales';
import { addDays } from 'date-fns';

type ListObservable = Observable<any> | Array<any>;

function getGlassQuantities(rows: Product_draft[]) {
  let res;
  let m2 = 0;
  let ml = 0;
  rows?.forEach((row) => {
    m2 += row.m2;
    ml += row.ml;
  });
  rows
    ? (res = [
        { key: m2, value: m2 + '  m2' },
        { key: ml, value: ml + '  ml' },
      ])
    : null;
  return res;
}

export type deliveryFormType = {
  order_id: number;
  predicted_date: Date;
  status: DeliveryStatus;
  isReturned: boolean;
  company_id: string;
  client_id: string;
  contact_id: string;
  payment_method: PaymentMethod;
};

const regConfigInvoice = (
  data?: InsertedInvoice | null,
  deliveries?: any,
  clients?,
  companies?,
  contacts?
) => [
  {
    type: 'selectSearch',
    name: 'deliveries',
    label: 'N° des livraisons',
    inputType: 'text',
    value: data?.deliveries?.map((value) => value.delivery_id),
    filterFields: ['id', 'company.name'],
    fieldsToShow: ['id', 'company.name'],
    multiple: true,
    disabled: data?.id != null,
    options: deliveries,
    validations: [REQUIRED],
  },
  {
    type: 'date',
    name: 'date',
    label: 'Date de facture',
    value: data?.date || new Date(),
    inputType: 'text',
    validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'company_id',
    label: 'Société',
    inputType: 'text',
    options: companies,

    value: data?.company_id,
    validations: [REQUIRED],
  },
  {
    type: 'selectSearch',
    name: 'client_id',
    label: 'Client',
    filterFields: ['name', 'phone'],
    fieldsToShow: ['name', 'phone'],
    inputType: 'text',
    options: clients,
    value: data?.client_id,
    validations: [REQUIRED],
  },
  {
    type: 'selectSearch',
    name: 'contact_id',
    label: 'Contact',
    filterFields: ['name', 'code'],
    fieldsToShow: ['name', 'code'],
    inputType: 'text',
    options: contacts,
    value: data?.contact_id,
  },
  {
    type: 'select',
    name: 'payment_method',
    label: 'Méthode de paiement',
    inputType: 'text',
    options: Object.values(PaymentMethod).map((e) => ({ key: e, value: e })),
    value: data?.payment_method,
    validations: [REQUIRED],
  },
];

const regConfigDelivery = (
  data?: InsertedDeliveryForm | null,
  orders?,
  clients?,
  companies?,
  contacts?
) => [
  {
    type: 'selectSearch',
    name: 'order_id',
    label: 'N° Commande',
    inputType: 'text',
    value: data?.order_id,
    filterFields: ['id', 'company.name'],
    fieldsToShow: ['id', 'company.name'],
    disabled: data !== null,
    options: orders,
    validations: [REQUIRED],
  },
  {
    type: 'checkbox',
    name: 'isReturned',
    label: 'Retourné ?',
    value: data?.isReturned ?? false,
    inputType: 'text',
  },
  {
    type: 'date',
    name: 'predicted_date',
    label: 'Date prévue',
    value: data?.predicted_date || new Date(),
    inputType: 'text',
  },
  {
    type: 'select',
    name: 'company_id',
    label: 'Société',
    inputType: 'text',
    options: companies,
    value: data?.company_id,
  },
  {
    type: 'selectSearch',
    name: 'client_id',
    label: 'Client',
    filterFields: ['name', 'phone'],
    fieldsToShow: ['name', 'phone'],
    inputType: 'text',
    options: clients,
    value: data?.client_id,
  },
  {
    type: 'selectSearch',
    name: 'contact_id',
    label: 'Contact',
    filterFields: ['name', 'code'],
    fieldsToShow: ['name', 'code'],
    inputType: 'text',
    options: contacts,
    value: data?.contact_id,
  },
  {
    type: 'select',
    name: 'payment_method',
    label: 'Méthode de paiement',
    inputType: 'text',
    options: Object.values(PaymentMethod).map((e) => ({ key: e, value: e })),
    value: data?.payment_method,
    validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'status',
    label: 'Etat',
    inputType: 'text',
    disabled: true,
    value: data?.status || DeliveryStatus.NOT_INVOICED,
    options: Object.values(DeliveryStatus).map((e) => ({ key: e, value: e })),
  },
];

const regConfigDraftInfos = (
  data?,
  customers: any = [],
  contacts: any = [],
  companies: any = [],
  salesPoints: any = []
) => {
  return [
    {
      type: 'selectSearch',
      name: 'customer_id',
      label: 'Clients',
      inputType: 'text',
      value: data?.customer_id ?? data?.customer?.id,
      filterFields: ['name', 'phone'],
      fieldsToShow: ['name', 'phone'],
      options: customers,
      validations: [REQUIRED],
    },
    {
      type: 'selectSearch',
      name: 'contact_id',
      label: 'Contacts',
      inputType: 'text',
      value: data?.contact_id ?? data?.contact?.id,
      filterFields: ['name', 'code'],
      fieldsToShow: ['name', 'code'],
      options: contacts,
    },
    {
      type: 'select',
      name: 'company_id',
      label: 'Société',
      inputType: 'text',
      value: data?.company_id ?? data?.company?.id,
      options: companies,
      validations: [REQUIRED],
    },
    {
      type: 'select',
      name: 'salepoint_id',
      label: 'Point de vente',
      inputType: 'text',
      options: salesPoints,
      value: data?.salepoint_id ?? data?.salepoint?.id,
      validations: [],
    },
    {
      type: 'date',
      name: 'date',
      label: 'Date',
      inputType: 'text',
      value: data?.date ?? new Date(),
    },
    {
      type: 'date',
      name: 'deadline',
      label: 'Délai',
      inputType: 'text',
      value: data?.deadline ?? addDays(new Date(), 30),
    },
  ];
}

const regConfigGlassItem = (
  glasses: Observable<Glass[]>,
  companies: any = [],
  warehouses: any = [],
  data?: Intermediate_Data,
  limit?: number
) => [
  {
    type: 'selectSearch',
    name: 'product_code',
    label: 'Code',
    inputType: 'text',
    value: data.data?.product_code,
    filterFields: ['id', 'label'],
    fieldsToShow: ['id', 'label'],
    options: glasses.pipe(
      map((item) =>
        item.map((glass) => ({
          id: glass.product.code,
          label: glass.product.label,
        }))
      )
    ),
  },

  {
    type: 'input',
    name: 'label',
    label: 'Désignation',
    inputType: 'text',
    value: data?.data?.label,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'select',
    name: 'company_id',
    label: 'Société',
    inputType: 'text',
    value: data?.data?.company_name,
    options: companies,
    //validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'warehouse_id',
    label: 'Stock',
    inputType: 'text',
    value: data?.data?.warehouse_id,
    options: warehouses,
    //validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'price',
    label: 'P.U',
    inputType: 'number',
    value: data?.data?.price,
    //validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'unit',
    label: 'Unité',
    inputType: 'text',
    value: data?.data?.unit,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];

const regConfigCustomerItem = (
  customerProducts: Observable<CustomerProduct[]>,
  data?: Intermediate_Data,
  limit?: number
) => [
  {
    type: 'selectSearch',
    name: 'product_code',
    label: 'Code',
    inputType: 'text',
    value: data.data?.product_code,
    filterFields: ['id', 'code'],
    fieldsToShow: ['id', 'code'],
    options: customerProducts.pipe(
      map((item) =>
        item.map((product) => ({
          id: product.product.code,
          label: product.product.label,
        }))
      )
    ),
  },
  {
    type: 'input',
    name: 'label',
    label: 'Désignation',
    inputType: 'text',
    value: data?.data?.label,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'unit',
    label: 'Unité',
    inputType: 'text',
    value: data?.data?.unit,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];

const regConfigAccessoireItem = (
  accessories: Observable<Accessory[]>,
  companies: any = [],
  warehouses: any = [],
  data?: Intermediate_Data,
  limit?: number
) => [
  {
    type: 'selectSearch',
    name: 'product_code',
    label: 'Code',
    inputType: 'text',
    value: data?.data?.product_code,
    filterFields: ['id', 'label'],
    fieldsToShow: ['id', 'label'],
    options: accessories.pipe(
      map((item) =>
        item.map((accessory) => ({
          id: accessory.product.code,
          label: accessory.product.label,
        }))
      )
    ),
  },
  {
    type: 'input',
    name: 'label',
    label: 'Désignation',
    inputType: 'text',
    value: data?.data?.label,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'quantity',
    label: 'Quantité',
    inputType: 'number',
    value: data?.data?.quantity,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },

  {
    type: 'select',
    name: 'company_id',
    label: 'Société',
    inputType: 'text',
    value: data?.data?.company_name,
    options: companies,
    validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'warehouse_id',
    label: 'Stock',
    inputType: 'text',
    value: data?.data?.warehouse_id,
    options: warehouses,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'price',
    label: 'P.U',
    inputType: 'number',
    value: data?.data?.price,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'unit',
    label: 'Unité',
    inputType: 'text',
    value: data?.data?.unit,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];
const regConfigServiceItem = (
  services: Observable<Service[]>,
  companies: any = [],
  data?: Intermediate_Data,
  limit?: number
) => [
  {
    type: 'selectSearch',
    name: 'product_code',
    label: 'Code',
    inputType: 'text',
    value: data?.data?.product_code,
    filterFields: ['id', 'label'],
    fieldsToShow: ['id', 'label'],
    options: services.pipe(
      map((item) =>
        item.map((service) => ({
          id: service.product.code,
          label: service.product.label,
        }))
      )
    ),
  },
  {
    type: 'input',
    name: 'label',
    label: 'Désignation',
    inputType: 'text',
    value: data?.data?.label,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },

  {
    type: 'inputSelect',
    name: 'quantity',
    label: 'Quantité',
    inputType: 'number',
    value: data?.data?.quantity,
    options: getGlassQuantities(data.rows) ?? [],
  },

  {
    type: 'select',
    name: 'company_id',
    label: 'Société',
    inputType: 'text',
    value: data?.data?.company_name,
    options: companies,
    //validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'warehouse_id',
    label: 'Stock',
    inputType: 'text',
    value: data?.data?.warehouse_id,
    options: [],
    //validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'price',
    label: 'P.U',
    inputType: 'number',
    value: data?.data?.price,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'unit',
    label: 'Unité',
    inputType: 'text',
    value: data?.data?.unit,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];

const regConfigConsumableItem = (
  consumbales: Observable<Consumable[]>,
  companies: any = [],
  warehouses: any = [],
  data?: Intermediate_Data,
  limit?: number
) => [
  {
    type: 'selectSearch',
    name: 'product_code',
    label: 'Code',
    inputType: 'text',
    value: data?.data?.product_code,
    filterFields: ['id', 'label'],
    fieldsToShow: ['id', 'label'],
    options: consumbales.pipe(
      map((item) =>
        item.map((consumable) => ({
          id: consumable.product.code,
          label: consumable.product.label,
        }))
      )
    ),
  },
  {
    type: 'input',
    name: 'label',
    label: 'Désignation',
    inputType: 'text',
    value: data?.data?.label,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },

  {
    type: 'inputSelect',
    name: 'quantity',
    label: 'Quantité',
    inputType: 'number',
    value: data?.data?.quantity,
    options: getGlassQuantities(data.rows) ?? [],
  },

  {
    type: 'select',
    name: 'company_id',
    label: 'Société',
    inputType: 'text',
    value: data?.data?.company_name,
    options: companies,
    //validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'warehouse_id',
    label: 'Stock',
    inputType: 'text',
    value: data?.data?.warehouse_id,
    options: warehouses,
    //validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'price',
    label: 'P.U',
    inputType: 'number',
    value: data?.data?.price,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'unit',
    label: 'Unité',
    inputType: 'text',
    value: data?.data?.unit,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];

const regConfigPayment = (data, customers, companies, limit?: number) => [
  {
    type: 'select',
    name: 'company_id',
    label: 'En faveur de',
    inputType: 'text',
    value: data?.data?.company_name,
    options: companies,
    validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'payment_method',
    label: 'Méthode de paiement',
    inputType: 'text',
    options: Object.values(PaymentMethod).map((e) => ({ key: e, value: e })),
    value: data?.payment_method,
  },
  {
    type: 'input',
    name: 'comment',
    label: 'Libellé',
    inputType: 'text',
    value: data?.data?.label,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'amount',
    label: 'Montant',
    inputType: 'number',
    value: data?.data?.amount,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'input',
    name: 'paper_ref',
    label: 'Référence',
    inputType: 'text',
    value: data?.data?.paper_ref,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'selectSearch',
    name: 'customer_id',
    label: 'Client',
    inputType: 'text',
    value: data?.customers,
    filterFields: ['name', 'phone'],
    fieldsToShow: ['name', 'phone'],
    options: customers,
  },
  {
    type: 'date',
    name: 'date',
    label: 'Date ',
    value: data?.date,
    inputType: 'text',
  },
  {
    type: 'date',
    name: 'deadline',
    label: "Date d'échéance ",
    value: data?.expected_date,
    inputType: 'text',
  },
];
export {
  regConfigDraftInfos,
  regConfigGlassItem,
  regConfigAccessoireItem,
  regConfigServiceItem,
  regConfigConsumableItem,
  regConfigCustomerItem,
  regConfigDelivery,
  regConfigInvoice,
  regConfigPayment,
};
