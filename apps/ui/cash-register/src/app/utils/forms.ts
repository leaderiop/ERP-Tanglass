import { MAXNUMBER, REQUIRED } from '@tanglass-erp/material';
import { PaymentMethod } from '@tanglass-erp/core/sales';


const regConfigCashBox = (data?) => [
  {
    type: 'input',
    inputType: 'text',
    name: 'name',
    label: 'Nom',
    value: data?.name,
  },
];



const regConfigPayment_ = (data, customers, companies, limit?: number) => [
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
    type: 'input',
    name: 'paper_ref',
    label: 'Référence',
    inputType: 'text',
    value: data?.data?.paper_ref,
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
    type: 'select',
    name: 'payment_method',
    label: 'Méthode de paiement',
    inputType: 'text',
    options: Object.values(PaymentMethod).map((e) => ({ key: e, value: e })),
    value: data?.payment_method,
    validations: [REQUIRED],
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
    type: 'select',
    name: 'company_id',
    label: 'En faveur de',
    inputType: 'text',
    value: data?.data?.company_name,
    options: companies,
    validations: [REQUIRED],
  },
  {
    type: 'date',
    name: 'date',
    label: 'Date ',
    value: data?.date ?? new Date(),
    inputType: 'text',
  },
  {
    type: 'date',
    name: 'deadline',
    label: "Date d'échéance ",
    value: data?.expected_date  ?? new Date(),
    inputType: 'text',
  },
].map(e => ({...e, style: 'flex: 0 1 100%; box-sizing: border-box;'}));


const regConfigPayment = (data, orders, customers, companies, limit?: number) => [
  {
    type: 'selectSearch',
    name: 'order_id',
    label: 'Commande',
    inputType: 'text',
    value: data?.data?.company_name,
    filterFields: ['id', 'ref'],
    fieldsToShow: ['id', 'ref'],
    options: orders,
    validations: [REQUIRED],
  },
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


const regConfigExpense = (data, categories, employees) => [
  {
    type: 'input',
    inputType: 'text',
    name: 'name',
    label: 'Nom',
    value: data?.name,
  },{
    type: 'select',
    inputType: 'text',
    name: 'category',
    label: 'Catégorie',
    options: categories,
    value: data?.category,
  },{
    type: 'input',
    inputType: 'number',
    name: 'amountSpent',
    label: 'Montant dépensé',
    value: data?.amountSpent,
  },{
    type: 'textarea',
    inputType: 'text',
    name: 'note',
    label: 'Remarque ',
    value: data?.note,
  },{
    type: 'selectSearch',
    inputType: 'text',
    name: 'employee_id',
    label: 'Employé ',
    value: data?.employee_id,
    filterFields: ['username', 'firstname'],
    fieldsToShow:  ['username', 'firstname'],
    options: employees
  },
];


export {
  regConfigExpense,
  regConfigCashBox,
  regConfigPayment,
  regConfigPayment_
}
