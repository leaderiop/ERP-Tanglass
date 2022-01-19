import { Column, ColumnType } from '@tanglass-erp/material';

export const PaymentsHeaders = [
  {
    field: 'id',
    headerName: 'N°',
    type: 'textColumn',
  },
  { field: 'customer.name', headerName: 'Client', type: 'textColumn' },
  { field: 'order_id', headerName: 'Commande.N°', type: 'textColumn' },
  { field: 'amount', headerName: 'Montant', type: 'numberColumn' },
  { field: 'date', headerName: 'Date', type: 'dateColumn' },
  { field: 'deadline', headerName: 'Date d\'échéance', type: 'dateColumn' },
  { field: 'company.name', headerName: 'Société', type: 'textColumn' },
];


export const ExpensesHeaders = [
  {
    field: 'id',
    headerName: 'N°',
    type: 'textColumn',
  },
  { field: 'name', headerName: 'Nom', type: 'textColumn' },
  { field: 'category', headerName: 'Catégorie' },
  { field: 'amountSpent', headerName: 'Montant dépensé', type: 'numberColumn' },
  { field: 'date', headerName: 'Date', type: 'dateColumn' },
  { headerName: 'Employé',
    children :[
      { field: 'employee.firstname', headerName: 'Prénom', type: 'textColumn' },
      { field: 'employee.lastname', headerName: 'Nom', type: 'textColumn' },
      { field: 'employee.username', headerName: 'Nom d\'utilisateur', type: 'textColumn' },
    ]
  },
];

export const OrderHeaders_ = [
  {
    field: 'id',
    headerName: 'N°',
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


export const OrderHeaders: Array<Column> = [
  { title: 'ref', key: 'ref', type: ColumnType.normal },
  { title: 'Date', key: 'date', type: ColumnType.template },
  { title: 'HT', key: 'total_ht', type: ColumnType.normal },
  { title: 'TVA', key: 'total_tax', type: ColumnType.normal },
  { title: 'TTC', key: 'total_ttc', type: ColumnType.normal },
  { title: 'Livraison', key: 'delivery_status', type: ColumnType.template },
  { title: 'Paiement', key: 'payment_status', type: ColumnType.template },
];


export const CustomerStatusHeaders: Array<Column> = [
  { title: 'Commande', key: 'order_ref', type: ColumnType.normal },
  { title: 'Montant TTC', key: 'total_ttc', type: ColumnType.normal },
  { title: 'Payé', key: 'paid', type: ColumnType.normal },
  { title: 'Crédit', key: 'credit', type: ColumnType.normal },
];
