import { InsertedContact } from './contact.models';

export interface PartialContact {
    id?: string;
    name?: string;
    note?: string;
    phone?: string;
}

export interface Address {
    id?: string;
    address?: string;
    city?: string;
    zip?: string;
}

export interface ContactAddress {

    contactid?: string,
    providerid?: string,
    customerid?: string,
    addresses: Address[],
}

export interface AddressDB {
    contactid?: string;
    customerid?: string;
    providerid?: string;
    address: {
        data: Address
    }
}

// for inserting   a new contact to a customer/provider
export interface InsertContact {
    id: string,
    contact: InsertedContact

}

// for inserting   a new address to a contact/customer/provider

export interface InsertAddressContact {
    id: string,
    address: Address

}
// for affecting an existing  contact to a customer

export interface AffectContactCustomer {

    customerid: string,
    contactid: string

}
// for affecting an existing  contact to a provider

export interface AffectContactProvider {
    providerid: string,
    contactid: string

}
// for deleting  an existing  address from a contact/customer/provider

export interface DeleteAddress{
    id:string;
    addressid:string;
}



export interface DeleteAffectedContact{
    id:string;
    contactid:string;
}
