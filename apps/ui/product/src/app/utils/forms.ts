import { FieldConfig, MINNUMBER, REQUIRED } from '@tanglass-erp/material';
import { paramOptions } from './enum';
import {
  Accessory,
  Consumable,
  CustomerProduct,
  Glass,
  Product,
  Product_AccessoryTypes_Enum,
  Product_ConsumableCategory_Enum,
  Product_Product_Unit_Enum,
  Service,
  ServiceConfig
} from '@TanglassStore/product/index';
import { Observable } from 'rxjs';

export interface ParamField {
  name: string;
  type: string;
  [key: string]: any;
}

type ListObservable = Array<any> | Observable<any>;

function getParams(params) {
  const equivalence = new Map([
    [paramOptions.TEXT, { type: "input", inputType: "text" }],
    [paramOptions.NUMBER, { type: "input", inputType: "number" }],
    [paramOptions.LIST, { type: "inputTag", inputType: "text", options: [] }],
  ]);

  const value = params.map(elem => <FieldConfig>
    ({ ...equivalence.get(elem.type), label: elem.name, name: "name", value: null })
  );
  return value;
}

const regConfigProduct = (data?: Product, listCompanies: ListObservable = []) => [
  {
    type: "input", label: "Code", inputType: "text", name: "code", value: data?.code,
    disabled:data?.code?true:false,
    validations: [
      REQUIRED
    ]
  },
  {
    type: "input", label: "Désignation", inputType: "text", name: "label", value: data?.label,
    validations: [
      REQUIRED
    ]
  },
  {
    type: "inputSelect", label: "Unité", inputType: "text", name: "unit", value: data?.unit,
    options: Object.values(Product_Product_Unit_Enum).map(item => ({ key: item, value: item })),
    validations: [
      REQUIRED
    ]
  },
  {
    type: "input", label: "Prix", inputType: "number", name: "price", value: data?.price,
    validations: [
      REQUIRED,
      MINNUMBER(1)
    ]
  },
  {
    type: "input", label: "Prix min", inputType: "number", name: "priceMin",
    value: data?.priceMin,
    validations: [
      REQUIRED,
      MINNUMBER(1)
    ]
  },
  {
    type: "input", label: "Prix max", inputType: "number", name: "priceMax",
    value: data?.priceMax,
    validations: [
      REQUIRED,
      MINNUMBER(1)
    ]
  },
  {
    type: "select", label: "Sociétés", multiple: true, name: "product_companies",
    value: data?.companies.map(e => e.id),
    options: listCompanies,
    validations: [
      REQUIRED,
    ]
  }
];


const regConfigAccessory = (data?: Accessory, listCompanies: ListObservable = []) => [
  {
    name: 'accessory',
    label: 'Accessoire',
    headerVisible: false,
    fields: [
      { type: "input", label: "Quota", inputType: "number", name: "quota", value: data?.quota },
      {
        type: "inputSelect", label: "Type", inputType: "text", name: "category", value: data?.category,
        options: Object.values(Product_AccessoryTypes_Enum).map(item => ({ key: item, value: item }))
      },

    ]
  },
  {
    name: "product",
    label: "Produit",
    headerVisible: false,
    fields: regConfigProduct(data?.product, listCompanies)
  }
];


const regConfigConsumable = (data?: Consumable, listCompanies: ListObservable = []) => [
  {
    name: 'consumable',
    label: 'Consommable',
    headerVisible: false,
    fields: [
      {
        type: "inputSelect", label: "Catégorie", inputType: "text", name: "category", value: data?.category,
        options: Object.values(Product_ConsumableCategory_Enum).map(item => ({ key: item, value: item }))
      },
      {
        type: "input", label: "Désg.Usine", inputType: "text", name: "labelFactory", value: data?.labelFactory,
      },
    ]
  },
  {
    name: "product",
    label: "Produit",
    headerVisible: false,
    fields: regConfigProduct(data?.product, listCompanies)
  },
];


const regConfigGlass = (data?: Glass, listCompanies: ListObservable = [],
  listTypes: ListObservable = [], listColors: ListObservable = []) => [
    {
      name: "product",
      label: "Produit",
      headerVisible: false,
      fields: regConfigProduct(data?.product, listCompanies)
    },
    {
      name: 'glasse',
      label: 'Verre',
      headerVisible: false,
      fields: [
        { type: "input", label: "Epaisseur", inputType: "number", name: "thickness", value: data?.thickness },
      ]
    }
  ];

const regConfigServiceConfig = (data?: ServiceConfig) => [
  {
    name: "service",
    label: "Service",
    headerVisible: false,
    fields: [
      {
        type: "input", label: "Nom", inputType: "text", name: "name", value: data?.name,
        validations: [
          REQUIRED
        ]
      },
      {
        type: "input", label: "Etiquette d\'usine", inputType: "text", name: "labelFactory",
        value: data?.labelFactory, validations: [REQUIRED]
      },
    ]
  },
  {
    name: "params",
    label: "Paramètres",
    headerVisible: true,
    fields: []
  },
];

const regConfigServiceConfigUpdate = (data?: ServiceConfig) => [
  {
    name: "service",
    label: "Service",
    headerVisible: false,
    fields: [
      {
        type: "input", label: "Nom", inputType: "text", name: "name", value: data?.name,
        validations: [
          REQUIRED
        ]
      },
      {
        type: "input", label: "Etiquette d\'usine", inputType: "text", name: "labelFactory",
        value: data?.labelFactory, validations: [REQUIRED]
      },
    ]
  },
];

const regConfService = (data?: Service, listCompanies: ListObservable = [], params?: ParamField[]) => [
  {
    name: "product",
    label: "Produit",
    headerVisible: true,
    fields: regConfigProduct(data?.product, listCompanies)
  },
  {
    name: "optionalParamValues",
    label: "Paramètres",
    headerVisible: true,
    fields: params ? getParams(params) : []
  }
];

const regParamForm = [
  {
    type: "input", label: "Nom", inputType: "text", name: "name", value: null,
    validations: [REQUIRED]
  },
  {
    type: "select", label: "Type", inputType: "text", name: "type", value: null,
    options: Object.values(paramOptions).map(elem => ({ key: elem, value: elem })),
    validations: [REQUIRED]
  },
];

const regConfigServiceConsumable = (data?, services: ListObservable = []) => [
  {
    type: "select", label: "Service", inputType: "text", name: "service", value: data?.service,
    options: services
  },
  { type: "input", label: "Quota", inputType: "text", name: "quota", value: data?.quota },
  {
    type: "select", label: "Consommable", inputType: "text", name: "consumable", value: data?.consumable,
    options: []
  },
];

const regConfigCustomerProduct = (data?: CustomerProduct) => [

  {
    type: "input", label: "code", inputType: "text", name: "code", value: data?.product?.code,
    validations: [
      REQUIRED
    ]
  },
  {
    type: "input", label: "Désignation", inputType: "text", name: "label", value: data?.product?.label,
    validations: [
      REQUIRED
    ]
  },
  {
    type: "input", label: "Epaisseur", inputType: "text", name: "thickness", value: data?.thickness,
    validations: [
      REQUIRED
    ]
  },
];

const regConfigSupplies = (data?: Accessory, listCompanies: ListObservable = []) => [
  {
    name: 'supply',
    label: 'Fournitures',
    headerVisible: false,
    fields: [

    ]
  },
  {
    name: "product",
    label: "Produit",
    headerVisible: false,
    fields: regConfigProduct(data?.product, listCompanies)
  }
];


export {
  regConfigAccessory,
  regConfigConsumable,
  regConfigGlass,
  regConfigServiceConfig,
  regConfigServiceConfigUpdate,
  regConfService,
  regParamForm,
  regConfigServiceConsumable,
  regConfigCustomerProduct,
  regConfigSupplies
};
