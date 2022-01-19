import { MAXNUMBER, REQUIRED } from '@tanglass-erp/material';
import {
  DetailedTransferOrder,
  itemTransferStatus,
  orderItemStatus,
  transferStatusDirection,
  Warehouse
} from '@tanglass-erp/store/inventory';
import { Observable } from 'rxjs';

type ListObservable = Observable<any> | Array<any>;

const regConfigWarehouse = (
  data?: Warehouse,
  companies: ListObservable = [],
  salespoints: ListObservable = []
) => [
  { type: 'input', name: 'name', label: 'Nom', value: data?.name },
  {
    type: 'select',
    name: 'company',
    label: 'Société',
    inputType: 'text',
    value: data?.company?.id,
    options: companies,
    validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'salesPoint',
    label: 'Point de vente',
    inputType: 'text',
    value: data?.salesPoint?.id,
    options: salespoints,
    validations: [REQUIRED],
  },
];

const regConfigTransferOrder = (
  data?: DetailedTransferOrder,
  localWarehouses: any = [],
  distributionWarehouses: any = [],
) => [
  {
    type: 'select',
    name: 'fromWarehouseid',
    label: 'De',
    inputType: 'text',
    value: data?.fromwarehouse?.id,
    options: localWarehouses,
    validations: [REQUIRED],
  },
  {
    type: 'select',
    name: 'toWarehouseid',
    label: 'À',
    inputType: 'text',
    value: data?.towarehouse?.id,
    options: distributionWarehouses,
    validations: [REQUIRED],
  },
  {
    type: 'date',
    name: 'date',
    label: 'Date',
    inputType: 'text',
    value: data?.date,
  },
  {
    type: 'date',
    name: 'deadline',
    label: 'Date limite',
    inputType: 'text',
    value: data?.deadline,
  },
];

const regConfigTransferOrderEdit = (
  data?: DetailedTransferOrder,
  localWarehouses: any = [],
  distributionWarehouses: any = [],
) => [
  ...regConfigTransferOrder(data, localWarehouses,distributionWarehouses),
  {
    type: 'inputSelect',
    name: 'status',
    label: 'Etat',
    inputType: 'text',
    value: data?.status,
    options: Object.values(transferStatusDirection).map((elem) => ({
      key: elem,
      value: elem,
    })),
  },
];

const regConfigTransferOrderItem = (
  data?,
  substances: any = [],
  limit?: number
) => [
  {
    type: 'radiobutton',
    name: 'typeSubstance',
    label: '',
    inputType: 'number',
    value: 'Verre',
    options: ['Accessoire', 'Verre'],
  },
  {type: "select", name: "substance", label: "Article",
    inputType: "text", value: data?.substance ?? [],
    options: substances,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'quantity',
    label: 'Quantité',
    inputType: 'number',
    value: data?.quantity,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];

const regConfigTransferOrderItemCard = (data: any, limit?: number) => [
  {
    type: 'select',
    name: 'substance',
    label: 'Substance',
    value: data.substance?.code,
    disabled: true,
    options: [{ key: data.substance?.code, value: data.substance?.label }],
  },
  {
    type: 'inputSelect',
    name: 'status',
    label: 'État',
    value: data.status,
    options: Object.values(orderItemStatus).map((elem) => ({
      key: elem,
      value: elem,
    })),
  },
  {
    type: 'input',
    name: 'quantity',
    label: 'Quantité',
    inputType: 'number',
    value: data?.quantity,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
];

const regConfigDelivery = (limit?: number) => [
  {
    type: 'input',
    inputType: 'number',
    label: 'Quantité',
    name: 'quantity',
    value: null,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  { type: 'date', label: 'Date', name: 'date', value: null },
  {
    type: 'inputSelect',
    name: 'status',
    label: 'État',
    value: null,
    options: Object.values(itemTransferStatus).map((elem) => ({
      key: elem,
      value: elem,
    })),
  },
];

// To edit
const regConfigTransferItem = (data, limit) => [
  {
    type: 'input',
    inputType: 'number',
    label: 'Quantité',
    name: 'quantity',
    value: data?.quantity,
    validations: [REQUIRED, MAXNUMBER(limit)],
  },
  {
    type: 'date',
    label: 'Date',
    name: 'date',
    value: data?.date,
    validations: [REQUIRED],
  },
  {
    type: 'inputSelect',
    name: 'status',
    label: 'État',
    disabled: data?.status === itemTransferStatus.out,
    value: data?.status,
    options: Object.values(itemTransferStatus).map((elem) => ({
      key: elem,
      value: elem,
    })),
  },
];

export {
  regConfigWarehouse,
  regConfigTransferOrder,
  regConfigTransferOrderItem,
  regConfigTransferOrderEdit,
  regConfigTransferOrderItemCard,
  regConfigDelivery,
  regConfigTransferItem
};
