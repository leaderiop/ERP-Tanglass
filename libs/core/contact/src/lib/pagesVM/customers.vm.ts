import { Customer, DetailedCustomer } from '../models/customer.models';
import { PartialContact } from '../models/shared.models';

//list of Customers
export interface CustomersVM {
    customers:Customer[];
    loading:boolean;
    error?: string;
}


//Customer fiche
export interface DetailedCustomerVM{
    customer:DetailedCustomer;
    loading:boolean;
    error?:string;
}


//Customer  Creation or editing

export interface CustomerCreationVM{

    contacts:PartialContact[];
    loading:boolean;
    error?:string;

}
