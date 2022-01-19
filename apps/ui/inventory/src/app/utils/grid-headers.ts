const warehouseHeaders = [
  {
    field: 'name', headerName: 'Nom', type: "linkColumn",
    cellRendererParams: (params) => (
      {
        link: `${params?.data?.id || params?.data?.warehouse?.id}`,
      }
    )
  },
  { field: 'company.name', headerName: 'Société', type: "textColumn" },
  { field: 'salesPoint.name', headerName: 'Point de vente', type: "textColumn" },
];

const warehouseTransferHeaders = [
  {
    field: 'id', headerName: 'Référence', type: "linkColumn",
    cellRendererParams: (params) => (
      {
        link: `${params?.data?.id}`,
      }
    )},
  { field: 'fromwarehouse.name', headerName: 'Entrepôt source', type: "textColumn" },
  { field: 'towarehouse.name', headerName: 'Entrepôt destination', type: "textColumn" },
  { field: 'status', headerName: 'Statut' },
  { field: 'date', headerName: 'Date', type: "dateColumn" },
  { field: 'deadline', headerName: 'Date limite', type: "dateColumn" },
];



const ProductHeaders = [
  { field: 'code', headerName: 'Code', type: "textColumn" },
  { field: 'label', headerName: 'Désignation', type: "textColumn" },
  { field: 'price', headerName: 'Prix', type: 'numberColumn' },
  { field: 'unit', headerName: 'Unité' },
];

const ordersDetailsHeaders = [
  {
    field: 'transfer_id', headerName: 'Référence', type: "linkColumn",
    cellRendererParams: (params) => (
      {
        link: `${params?.data?.transfer_id}`,
      }
    )
  },
  ...ProductHeaders.map(elem => ({ ...elem })).map(elem => (elem.field = 'item.' + elem.field) && elem),

  { field: 'fromwarehouse', headerName: 'Entrepôt source', type: "textColumn" },
  { field: 'towarehouse', headerName: 'Entrepôt destination', type: "textColumn" },
  { field: 'status', headerName: 'Statut', type: "textColumn" },
  { field: 'date', headerName: 'Date', type: "textColumn" },
  { field: 'deadline', headerName: 'Date limite', type: "textColumn" },

];

const orderItemsHeaders = [
  { field: 'substance.code', headerName: 'Article', type: "textColumn", cellRenderer: 'agGroupCellRenderer' },
  { field: 'substance.label', headerName: 'Désignation', type: "textColumn" },
  { field: 'quantity', headerName: 'Quantité', type: 'numberColumn' },
  { field: 'total_deliveries', headerName: 'Livré', type: 'numberColumn',
    valueGetter: params => params.data.total_deliveries ?? 0,
    cellStyle: {color: 'green'}
  },
  { field: 'substance.unit', headerName: 'Unité', type: 'textColumn' },
  { field: 'status', headerName: 'Etat' },
];


const TransferItemsHeaders = [
  { field: 'quantity', headerName: 'Quantité livrée', type: 'numberColumn' },
  { field: 'date', headerName: 'Date', type: 'dateTimeColumn' },
  { field: 'status', headerName: 'Etat' },
  { field: 'confirmed', headerName: 'Confirmé ?',
    valueFormatter: params => params.value?'oui':'non',
    cellStyle: params => {
        return {color: params.value?'green':'red'};
    }},
  {field: 'id', headerName: 'Action', type: "editColumn", cellRendererParams: (params) => (
      {
        extra: [
          { icon: "edit", tooltip: "modifier", event: "editNested"},
          { icon: "check", tooltip: "confirmer", event: "confirm" }
        ],
        hideEdit: true
      }
    )},
];

const SubstanceGlassHeaders = [
  { field: 'substance.productGlass.code', headerName: 'Code', type: "textColumn" },
  ...ProductHeaders.filter( elm => elm.field !== 'code').map(elem => ({ ...elem })).map(elem => (elem.field = 'substance.productGlass.' + elem.field) && elem),
  //{ field: 'substance.glass.type', headerName: 'Type', type: "textColumn" },
  //{ field: 'substance.glass.color', headerName: 'Couleur', type: "textColumn" },
  { field: 'substance.glass.thickness', headerName: 'épaisseur', type: "numberColumn" },
];

const SubstanceAccessoryHeaders = [
... ProductHeaders.map(elem => ({ ...elem }))
  .map(elem => (elem.field = 'substance.productAccessory.' + elem.field)&& elem),
 { field: 'substance.accessory.category', headerName: 'Catégorie' },
];

const SubstanceConsumableHeaders = [

  ...ProductHeaders.map(elem => ({ ...elem }))
    .map(elem => (elem.field = 'substance.productConsumable.' + elem.field) && elem),
  { field: 'substance.consomable.category', headerName: 'Catégorie' },

];


const GlassWarehouseHeaders = [
  {
    headerName: 'Substance: Produit Stockable',
    children: SubstanceGlassHeaders
  },
  { field: 'quantity', headerName: 'Quantité' },
  {
    headerName: 'Entrepôt',
    children:
      warehouseHeaders.map(elem => ({ ...elem }))
        .map(elem => (elem.field = 'warehouse.' + elem.field) && elem)
  },

];

const ConsumableWarehouseHeaders = [
  {
    headerName: 'Substance: Consommables/Matiére Première',
    children:
      SubstanceConsumableHeaders
  },
  { field: 'quantity', headerName: 'Quantité' },
  {
    headerName: 'Entrepôt',
    children:
      warehouseHeaders.map(elem => ({ ...elem })).map(elem => (elem.field = 'warehouse.' + elem.field) && elem)
  },
];

const AccessoryWarehouseHeaders = [
  {
    headerName: 'Substance:Accessoires /Système Apparent',
    children:
    SubstanceAccessoryHeaders
  },
  { field: 'quantity', headerName: 'Quantité' },
  {
    headerName: 'Entrepôt',
    children:
      warehouseHeaders.map(elem => ({ ...elem }))
        .map(elem => (elem.field = 'warehouse.' + elem.field) && elem)
  },

];


const StockAdjustmentHeaders = [
  { field: 'ref', headerName: 'Référence', type: "textColumn", cellRenderer: 'agGroupCellRenderer' },
  { field: 'product.code', headerName: 'Article', type: "textColumn", cellRenderer: 'agGroupCellRenderer' },
  { field: 'product.label', headerName: 'Désignation', type: "textColumn" },
  { field: 'product.unit', headerName: 'Unité', type: 'textColumn' },
  { field: 'oldQuantity', headerName: ' Quantité Avant ', type: 'numberColumn' },
  { field: 'newQuantity', headerName: 'Quantité Aprés ', type: 'numberColumn' },
  { field: 'reason', headerName: 'Raison', type: 'textColumn' },
  { field: 'createdBy', headerName: 'Par' ,type: 'textColumn' },
  { field: 'role', headerName: 'Role' ,type: 'textColumn' },

];


export {
  warehouseHeaders,
  warehouseTransferHeaders,
  GlassWarehouseHeaders,
  ConsumableWarehouseHeaders,
  AccessoryWarehouseHeaders,
  ordersDetailsHeaders,
  orderItemsHeaders,
  TransferItemsHeaders,
  StockAdjustmentHeaders
};
