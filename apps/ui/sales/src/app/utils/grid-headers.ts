import { Component } from '@angular/core';
import { Column, ColumnType } from '@tanglass-erp/material';
import { DefaultCellRendererComponent } from '@tanglass-erp/ag-grid';
import { DeliveryStatus } from '@tanglass-erp/core/sales';

export const action = {
  title: 'Action',
  key: 'action',
  type: ColumnType.template,
  withRow: true,
};

@Component({
  template: `<span [class]="get_class()">{{ value }}</span>`,
})
export class InvoiceStatusComponent extends DefaultCellRendererComponent {
  stat_class = '';

  get_class() {
    if (this.value === DeliveryStatus.INVOICED) return 'text-success';
    return '';
  }
}

export const displayedAmountsColumns: Array<Column> = [
  { key: 'company_name', title: 'Société', type: ColumnType.normal },
  { key: 'total_ht', title: 'Total Hors Taxe', type: ColumnType.normal },
  { key: 'total_tax', title: 'Total TVA', type: ColumnType.normal },
  { key: 'total_ttc', title: 'Total TTC', type: ColumnType.normal },
];

export const displayedAmounts_PaymentsColumns: Array<Column> = [
  { key: 'company', title: 'Société', type: ColumnType.normal },
  { key: 'total_HT', title: 'Total Hors Taxe', type: ColumnType.normal },
  { key: 'total_TVA', title: 'Total TVA', type: ColumnType.normal },
  { key: 'total_TTC', title: 'Total TTC', type: ColumnType.normal },
  { key: 'received', title: 'Reçu', type: ColumnType.normal },
  { key: 'debt', title: 'Reste', type: ColumnType.normal },
];
export const ProductColumns: Array<Column> = [
  // { field: 'id', headerName: 'ID. ' },
  { key: 'product_code', title: 'Code', type: ColumnType.normal },
  { key: 'label', title: 'Désignation', type: ColumnType.normal },
  { key: 'count', title: 'Count', type: ColumnType.normal },
  { key: 'heigth', title: 'Hauteur', type: ColumnType.normal },
  { key: 'width', title: 'Largeur', type: ColumnType.normal },
  { key: 'unit', title: 'Unité', type: ColumnType.normal },
  { key: 'm2', title: 'm2', type: ColumnType.normal },
  { key: 'ml', title: 'ml', type: ColumnType.normal },
  { key: 'price', title: 'P.U', type: ColumnType.normal },
  { key: 'total_price', title: 'Total', type: ColumnType.normal },
  { key: 'company_name', title: 'Société', type: ColumnType.normal },
];
export const ProductGlassHeaders: Array<Column> = [
  // { field: 'id', headerName: 'ID. ' },
  ...ProductColumns,
  action,
];

export const ProductHeaders: Array<Column> = [
  //{ field: 'id', headerName: 'ID. ' },
  { key: 'product_code', title: 'Code', type: ColumnType.normal },
  { key: 'label', title: 'Désignation', type: ColumnType.normal },
  { key: 'quantity', title: 'Quantité', type: ColumnType.normal },
  { key: 'unit', title: 'Unité', type: ColumnType.normal },
  { key: 'price', title: 'P.U', type: ColumnType.normal },
  { key: 'total_price', title: 'Total', type: ColumnType.normal },
  { key: 'company_name', title: 'Société', type: ColumnType.normal },
  action,
];

export const QuotationHeaders = [
  {
    field: 'id',
    headerName: 'N°',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'customer.name', headerName: 'Client', type: 'textColumn' },
  { field: 'customer.phone', headerName: 'Phone.N°', type: 'textColumn' },
  { field: 'date', headerName: 'Date', type: 'textColumn' },
  { field: 'deadline', headerName: 'Expiration', type: 'textColumn' },
  { field: 'company.name', headerName: 'Société', type: 'textColumn' },
  { field: 'total_ttc', headerName: 'Total TTC', type: 'numberColumn' },
  { field: 'total_tax', headerName: 'Total TVA', type: 'numberColumn' },
  { field: 'total_ht', headerName: 'Total HT', type: 'numberColumn' },
  { field: 'status', headerName: 'Statut', type: 'textColumn' },
];

export const DraftHeaders = [
  {
    field: 'id',
    headerName: 'N°',
  },
  { field: 'customer.name', headerName: 'Client', type: 'textColumn' },
  { field: 'customer.phone', headerName: 'Phone.N°', type: 'textColumn' },
  { field: 'date', headerName: 'Date', type: 'textColumn' },
  { field: 'deadline', headerName: 'Expiration', type: 'textColumn' },
  { field: 'company.name', headerName: 'Société', type: 'textColumn' },
  { field: 'total_ttc', headerName: 'Total TTC', type: 'numberColumn' },
  { field: 'total_tax', headerName: 'Total TVA', type: 'numberColumn' },
  { field: 'total_ht', headerName: 'Total HT', type: 'numberColumn' },
  { field: 'status', headerName: 'Statut', type: 'textColumn' },
];

export const OrderHeaders = [
  {
    field: 'id',
    headerName: 'N°',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'ref', headerName: 'Réf', type: 'numberColumn' },
  { field: 'customer.name', headerName: 'Client', type: 'textColumn' },
  { field: 'customer.phone', headerName: 'Phone.N°', type: 'textColumn' },
  { field: 'date', headerName: 'Date', type: 'textColumn' },
  { field: 'deadline', headerName: 'Expiration', type: 'textColumn' },
  { field: 'company.name', headerName: 'Société', type: 'textColumn' },
  { field: 'total_ttc', headerName: 'Total TTC', type: 'numberColumn' },
  { field: 'total_tax', headerName: 'Total TVA', type: 'numberColumn' },
  { field: 'total_ht', headerName: 'Total HT', type: 'numberColumn' },
  { field: 'delivery_status', headerName: 'Livraison', type: 'textColumn' },
  { field: 'payment_status', headerName: 'paiement', type: 'textColumn' },
];

export const deliveryLineHeaders: Array<Column> = [
  { title: 'Article', key: 'product.label', type: ColumnType.normal },
  {
    title: 'Quantité',
    key: 'qte',
    type: ColumnType.template,
    withRow: true,
  },
  {
    title: 'Quantité commandé',
    key: 'product.quantity',
    type: ColumnType.normal,
  },
  {
    title: 'Total livrée',
    key: 'product.delivered',
    type: ColumnType.template,
  },
  { title: 'Reste', key: 'rest', type: ColumnType.template, withRow: true },
  { title: 'Unité', key: 'product.unit', type: ColumnType.normal },
  { title: 'Prix unitaire', key: 'product.price', type: ColumnType.normal },
  {
    title: 'Montant',
    key: 'amount',
    type: ColumnType.normal,
  },
];

export const deliveryHeaders = [
  {
    headerName: 'Livraison',
    children: [
      {
        field: 'ref',
        headerName: 'Référence',
        type: 'linkColumn',
        cellRendererParams: (params) => ({
          link: ['update', { id: params?.data?.id }],
        }),
      },
      {
        field: 'status',
        headerName: 'Etat',
        cellRendererFramework: InvoiceStatusComponent,
      },
      { field: 'order_id', headerName: 'N° Commande', type: 'textColumn' },
      {
        field: 'createdAt',
        headerName: 'Date de création',
        type: 'dateColumn',
      },
      {
        field: 'amount_ttc',
        headerName: 'Montant TTC',
        type: 'numberColumn',
        valueFormatter: (params) => params.value.toFixed(2),
      },
      {
        field: 'amount_tva',
        headerName: 'Montant TVA',
        type: 'numberColumn',
        valueFormatter: (params) => params.value.toFixed(2),
      },
      {
        field: 'amount_ht',
        headerName: 'Montant HT',
        type: 'numberColumn',
        valueFormatter: (params) => params.value.toFixed(2),
      },
      {
        field: 'isReturned',
        headerName: 'Retourné',
      },
    ],
  },
  {
    headerName: 'Société',
    children: [{ field: 'company.name', headerName: 'Nom' }],
  },
  {
    headerName: 'Client',
    children: [
      { field: 'client.name', headerName: 'Nom', type: 'textColumn' },
      { field: 'client.mail', headerName: 'E-mail', type: 'textColumn' },
    ],
  },
  {
    headerName: 'Contact',
    children: [
      { field: 'contact.name', headerName: 'Nom', type: 'textColumn' },
      { field: 'contact.mail', headerName: 'E-mail', type: 'textColumn' },
      { field: 'contact.phone', headerName: 'Phone', type: 'textColumn' },
    ],
  },
];

export const invoiceHeaders = [
  {
    headerName: 'Facture',
    children: [
      {
        field: 'ref',
        headerName: 'Référence',
        type: 'linkColumn',
        cellRendererParams: (params) => ({
          link: ['update', { id: params?.data?.id }],
        }),
      },
      {
        field: 'date',
        headerName: 'Date de facture',
        type: 'dateColumn',
      },
      {
        field: 'payment_method',
        headerName: 'Méthode de paiment',
      },
      {
        field: 'amount_ttc',
        headerName: 'Montant TTC',
        type: 'numberColumn',
        valueFormatter: (params) => params.value.toFixed(2),
      },
      {
        field: 'amount_tva',
        headerName: 'Montant TVA',
        type: 'numberColumn',
        valueFormatter: (params) => params.value.toFixed(2),
      },
      {
        field: 'amount_ht',
        headerName: 'Montant HT',
        type: 'numberColumn',
        valueFormatter: (params) => params.value.toFixed(2),
      },
    ],
  },
  {
    headerName: 'Société',
    children: [{ field: 'company.name', headerName: 'Nom' }],
  },
  {
    headerName: 'Client',
    children: [
      { field: 'client.name', headerName: 'Nom', type: 'textColumn' },
      { field: 'client.mail', headerName: 'E-mail', type: 'textColumn' },
    ],
  },
  {
    headerName: 'Contact',
    children: [
      { field: 'contact.name', headerName: 'Nom', type: 'textColumn' },
      { field: 'contact.mail', headerName: 'E-mail', type: 'textColumn' },
      { field: 'contact.phone', headerName: 'Phone', type: 'textColumn' },
    ],
  },
];

export const ProductDraftHeaders = [
  { field: 'id', headerName: 'ID. ' },
  { field: 'product_code', headerName: 'Code' },
  { field: 'label', headerName: 'Désignation' },
  { field: 'count', headerName: 'Count' },
  { field: 'heigth', headerName: 'Hauteur' },
  { field: 'width', headerName: 'Largeur' },
  { field: 'm2', headerName: 'm2' },
  { field: 'ml', headerName: 'ml' },
  { field: 'unit', headerName: 'Unité' },
  { field: 'price', headerName: 'P.U' },
  { field: 'total_price', headerName: 'Total' },
  { field: 'company_name', headerName: 'Société' },
];

export const PaymentsHeaders: Array<Column> = [
  { key: 'paper_ref', title: 'Référence ', type: ColumnType.normal },
  { key: 'amount', title: 'Montant', type: ColumnType.normal },
  { key: 'date', title: 'date', type: ColumnType.normal },
  { key: 'deadline', title: 'échéance', type: ColumnType.normal },
  { key: 'payment_method', title: 'Mode de payment', type: ColumnType.normal },
  { key: 'comment', title: 'Commentaire', type: ColumnType.normal },
  { key: 'company', title: 'En Faveur de', type: ColumnType.normal },
];

// export const OrderDeliveriesHeaders: Array<Column> = [

//   { key: 'ref', title: 'Référence', type: ColumnType.normal},
//   { key: 'client.code', title: 'Code Client', type: ColumnType.normal },
//   { key: 'client.name', title: 'Nom Client', type: ColumnType.normal },
//   { key: 'company.name', title: 'Société', type: ColumnType.normal },
//   { key: 'isReturned', title: "BL d'avoir", type: ColumnType.normal },
//   { key: 'amount_ht', title: 'Montant HT', type: ColumnType.normal },
//   { key: 'amount_ttc', title: 'Montant TTC', type: ColumnType.normal },
//   { key: 'amount_tva', title: 'Montant TVA', type: ColumnType.normal },
//   { key: 'payment_method', title: 'Payé par', type: ColumnType.normal },

// ];




export const OrderDeliveriesHeaders = [
  {
    field: 'ref',
    headerName: 'Référence',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: ['../../delivery/update', { id: params?.data?.id }],
    }),
  },
  { field: 'client.code', headerName: 'Client', type: 'textColumn' },
  { field: 'client.name', headerName: 'Nom de Client', type: 'textColumn' },
  { field: 'createdAt', headerName: 'Date', type: 'Date' },
  { field: 'company.name', headerName: 'Société', type: 'textColumn' },
  { field: 'amount_ht', headerName: 'Total HT', type: 'numberColumn' },
  { field: 'amount_tva', headerName: 'Total TVA', type: 'numberColumn' },
  { field: 'amount_ttc', headerName: 'Total TTC', type: 'numberColumn' },
  { field: 'payment_method', headerName: 'Payé en', type: 'textColumn' },
  { field: 'isReturned', headerName: 'Avoir ?', type: 'textColumn' },

];