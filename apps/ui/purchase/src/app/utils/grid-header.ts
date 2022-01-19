import { Column, ColumnType } from '@tanglass-erp/material';


export const PurchaseHeaders = [
  {
    field: 'id',
    headerName: 'N°',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'id', headerName: 'Réference', type: "textColumn" },
  { field: 'date', headerName: 'Date', type: "textColumn" },
  { field: 'provider.name', headerName: 'Fournisseur', type: "textColumn" },
];


export const DeliveredItemsHeaders = [
  { field: 'code', headerName: 'Code', type: "textColumn" },
  { field: 'label', headerName: 'Désignation', type: "textColumn" },
  { field: 'status', headerName: 'Etat', type: "textColumn" },
  { field: 'company', headerName: 'Société', type: "textColumn" },
];


export const SubstanceHeaders: Array<Column> = [
  { key: 'code', title: 'Code', type: ColumnType.normal },
  { key: 'label', title: 'Désignation', type: ColumnType.normal },
  { key: 'quantity', title: 'Quantité', type: ColumnType.normal },
  { key: 'unit', title: 'Unité', type: ColumnType.normal },
  { key: 'cost', title: 'Cout', type: ColumnType.normal },
  { key: 'warehouse.name', title: 'Entrepôt', type: ColumnType.normal },
  { key: 'warehouse.company.name', title: 'Société', type: ColumnType.normal },

];
