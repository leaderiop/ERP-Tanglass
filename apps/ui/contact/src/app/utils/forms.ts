import { EMAIL, REQUIRED } from '@tanglass-erp/material';

const regConfigAddresses = (data?) => [
  {
    type: 'input',
    name: 'address',
    label: 'Adresse',
    inputType: 'text',
    value: data?.address,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'city',
    label: 'Ville',
    inputType: 'text',
    value: data?.city,
  },
  {
    type: 'input',
    name: 'zip',
    label: 'Code postal',
    inputType: 'text',
    value: data?.zip,
  },
];

const regConfigProvider = (data?, contacts: any = []) => [
  {
    type: 'input',
    name: 'code',
    label: 'Code',
    inputType: 'text',
    value: data?.code,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'name',
    label: 'Nom',
    inputType: 'text',
    value: data?.name,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'mail',
    label: 'E-mail',
    inputType: 'text',
    value: data?.mail,
    validations: [EMAIL],
  },
  {
    type: 'input',
    name: 'phone',
    label: 'Téléphone',
    inputType: 'text',
    value: data?.phone,
    validations: [REQUIRED],
  },
  {
    type: 'textarea',
    name: 'note',
    label: 'Note',
    inputType: 'text',
    value: data?.note,
  },
  {
    type: 'selectSearch',
    name: 'affectedContacts',
    label: 'Contacts',
    inputType: 'text',
    value: data?.contacts ?? [],
    filterFields: ['name', 'phone'],
    fieldsToShow: ['name', 'phone'],
    options: contacts,
    multiple: true,
  },
];

const regConfigContact = (data?) => [
  {
    type: 'input',
    name: 'code',
    label: 'Code',
    inputType: 'text',
    value: data?.code,
    validations: [
      REQUIRED
    ]
  },
  {
    type: 'input',
    name: 'name',
    label: 'Nom',
    inputType: 'text',
    value: data?.name,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'mail',
    label: 'E-mail',
    inputType: 'email',
    value: data?.mail,
    validations: [EMAIL],
  },
  {
    type: 'input',
    name: 'phone',
    label: 'Téléphone',
    inputType: 'tel',
    value: data?.phone,
    validations: [REQUIRED],
  },
  {
    type: 'textarea',
    name: 'note',
    label: 'Note',
    inputType: 'text',
    value: data?.note,
  },
];

const regConfigContactDetailed = (data?, customers = [], providers = []) => [
  {
    name: 'contact',
    label: 'Information Générales',
    fields: regConfigContact(data),
    headerVisible: true,
  },
  {
    name: 'affectation',
    label: 'Affectation',
    headerVisible: true,
    fields: [
      {
        type: 'select',
        name: 'customers',
        label: 'Clients',
        inputType: 'text',
        value: data?.customers,
        multiple: true,
        options: customers,
      },
      {
        type: 'select',
        name: 'provider',
        label: 'Fournisseurs',
        inputType: 'text',
        value: data?.provider,
        multiple: true,
        options: providers,
      },
    ],
  },
];

const regCustomerConfig = (data?, contacts: any = []) => [
  {
    type: 'input',
    name: 'code',
    label: 'Code',
    inputType: 'text',
    value: data?.code,
    validations: [REQUIRED],
  },
  {
    type: 'input',
    name: 'name',
    label: 'Nom',
    inputType: 'text',
    value: data?.name,
    validations: [
      REQUIRED
    ]
  },
  {
    type: 'input',
    label: 'ICE',
    inputType: 'text',
    name: 'ICE',
    value: data?.ICE,
  },
  {
    type: 'input',
    label: 'IF',
    inputType: 'text',
    name: 'IF',
    value: data?.IF},
  {
    type: 'input',
    name: 'phone',
    label: 'Téléphone',
    inputType: 'text',
    value: data?.phone,
    validations: [
      REQUIRED
    ]
  },
  {
    type: 'input',
    name: 'mail',
    label: 'E-mail',
    inputType: 'text',
    value: data?.mail,
    validations: [EMAIL],
  },
  {
    type: 'textarea',
    name: 'note',
    label: 'Note',
    inputType: 'text',
    value: data?.note,
  },
  {
    type: 'input',
    name: 'website',
    label: 'Site web',
    inputType: 'text',
    value: data?.website,
  },
  {
    type: 'input',
    name: 'FAX',
    label: 'Fax',
    inputType: 'text',
    value: data?.FAX,
  },
  {
    type: 'selectSearch',
    name: !data?.id ? 'affectedContacts' : 'contacts',
    label: 'Contacts',
    inputType: 'text',
    value: data?.contacts ?? [],
    filterFields: ['name', 'phone'],
    fieldsToShow: ['name', 'phone'],
    options: contacts,
    multiple: true,
  },
];

export {
  regConfigAddresses,
  regConfigProvider,
  regConfigContact,
  regConfigContactDetailed,
  regCustomerConfig,
};
