
const ProductHeaders = [
  {
    field: 'product.code', headerName: 'Code', type: "linkColumn",
    cellRendererParams: (params) => (
      {
        link: `${params?.data?.id}`,
      })
  },
  { field: 'product.label', headerName: 'Désignation', type: "textColumn" },
  { field: 'product.unit', headerName: 'Unité', type: "numberColumn" },
  { field: 'product.price', headerName: 'Prix', type: "numberColumn" },
  { field: 'product.priceMin', headerName: 'Prix min', type: "numberColumn" },
  { field: 'product.priceMax', headerName: 'Prix max', type: "numberColumn" },
];

const GlassHeaders = [
  {
    headerName: 'Produit: Produit Stockable',
    children: ProductHeaders
  },
  {
    headerName: 'Caractéristiques',
    children: [
    //  { field: 'type', headerName: 'Type', type: "textColumn" },
    //  { field: 'color', headerName: 'Couleur', type: "textColumn" },
      { field: 'thickness', headerName: 'Epaisseur', type: "numberColumn" },
    ]
  },

];


const CustomerProductHeaders = [

    { field: 'product.code', headerName: 'Code', type: "textColumn"},
    { field: 'product.label', headerName: 'Désignation', type: "textColumn"},
    { field: 'thickness', headerName: 'Epaisseur', type: "textColumn"},
  ];



const ConsumableHeaders = [
  {
    headerName: 'Produit: Consommables et Matiére Première',
    children: ProductHeaders
  },
  {
    headerName: '',
    children: [
      { field: 'category', headerName: 'Catégory',type: "textColumn" },
    ]
  },

];

const AccessoryHeaders = [
  {
    headerName: 'Produit:Accessoires et Systéme Apparent ',
    children: ProductHeaders
  },
  {
    headerName: '',
    children: [
      { field: 'category', headerName: 'Catégory',type: "textColumn" },
      { field: 'quota', headerName: 'Quota', type: "numberColumn" },
    ]
  },
];

const ServiceHeaders = [
  {
    headerName: 'Produit',
    children: ProductHeaders
  }
];


const ServiceGlassHeaders = [
  {
    headerName: '',
    children: [
      {
        field: 'labelFactory', headerName: "Désignation d'usine" , type: "linkColumn",
        cellRendererParams: (params) => (
          {
            link: `${params.data.id}`,
          })
      },
    ]
  },
  {
    headerName: 'Service',
    children: ServiceHeaders
  },
  {
    headerName: 'Produit',
    children: ProductHeaders
  },
];

const ServiceConsumableHeaders = [
  {
    headerName: '',
    children: [
      { field: 'quota', headerName: 'Quota ', type: "numberColumn" }
    ]
  },
  {
    headerName: 'Service',
    children: ServiceHeaders
  },
  {
    headerName: 'Produit',
    children: ProductHeaders
  },
];

const SuppliesHeaders = [
  {
    headerName: 'Produit:Fournitures ',
    children: ProductHeaders
  },
  {
    headerName: '',
    children: [
      { field: 'category', headerName: 'Catégory', type: "textColumn" },
      { field: 'quota', headerName: 'Quota', type: "numberColumn" },
    ]
  },
];

export {
  ServiceHeaders,
  ProductHeaders,
  GlassHeaders,
  AccessoryHeaders,
  ConsumableHeaders,
  ServiceConsumableHeaders,
  ServiceGlassHeaders,
  SuppliesHeaders,
  CustomerProductHeaders
};
