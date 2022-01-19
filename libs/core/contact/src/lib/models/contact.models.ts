import { InsertedCustomer } from './customer.models';
import { InsertedProvider } from './provider.models';
import { Address } from './shared.models';
import { MetaData } from '@tanglass-erp/core/common';


export interface Contact {
    id: string;
    mail?: string;
    code?: string;
    name: string;
    note?: string;
    phone: string;
}

export interface DetailedContact extends InsertedContact {
    id: string;

}

export interface InsertedContact extends MetaData {
    mail?: string;
    name?: string;
    code?: string;
    note?: string;
    phone?: string;
    addresses?: Address[];
    customers?: InsertedCustomer[];
    providers?: InsertedProvider[];
    affectedCustomers?: string[];
    affectedProviders?: string[];
}


export interface AffectedContact {
    contactid?: string
}



