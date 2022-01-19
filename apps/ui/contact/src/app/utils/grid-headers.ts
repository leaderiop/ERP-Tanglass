const ContactHeaders = [
  {
    field: 'code',
    headerName: 'Code',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'name', headerName: 'Name', type: 'textColumn' },
  { field: 'phone', headerName: 'Téléphone', type: 'textColumn' },
  { field: 'note', headerName: 'Note', type: 'textColumn' },
  { field: 'mail', headerName: 'E-mail', type: 'textColumn' },
];

const CustomerHeaders = [
  {
    field: 'code',
    headerName: 'Code',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'name', headerName: 'Name', type: 'textColumn' },
  { field: 'ICE', headerName: 'ICE', type: 'textColumn' },
  { field: 'IF', headerName: 'IF', type: 'textColumn' },
  { field: 'mail', headerName: 'E-mail', type: 'textColumn' },
  { field: 'phone', headerName: 'Téléphone', type: 'textColumn' },
];

const ProviderHeaders = [
  {
    field: 'code',
    headerName: 'Code',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'name', headerName: 'Name', type: 'textColumn' },
  { field: 'note', headerName: 'Note', type: 'textColumn' },
  { field: 'mail', headerName: 'E-mail', type: 'textColumn' },
  { field: 'phone', headerName: 'Téléphone', type: 'textColumn' },
];

const CustomerOrdersHeaders = [
  {
    field: 'id',
    headerName: 'N°',
    type: 'linkColumn',
    cellRendererParams: (params) => ({
      link: `${params?.data?.id}`,
    }),
  },
  { field: 'ref', headerName: 'Réf', type: 'numberColumn' },
  { field: 'date', headerName: 'Date', type: 'textColumn' },
  { field: 'deadline', headerName: 'Expiration', type: 'textColumn' },
  { field: 'company.name', headerName: 'Société', type: 'textColumn' },
  { field: 'total_ttc', headerName: 'Total TTC', type: 'numberColumn' },
  { field: 'total_tax', headerName: 'Total TVA', type: 'numberColumn' },
  { field: 'total_ht', headerName: 'Total HT', type: 'numberColumn' },
  { field: 'delivery_status', headerName: 'Livraison', type: 'textColumn' },
  { field: 'payment_status', headerName: 'paiement', type: 'textColumn' },
];
export {
  ContactHeaders,
  CustomerHeaders,
  ProviderHeaders,
  CustomerOrdersHeaders,
};
