import { MetaData } from '@tanglass-erp/core/common';
import { InsertedContact } from './contact.models';
import { Address, PartialContact } from './shared.models';


// used for  providers grid table display

export interface Provider{
    id:string;
    name:string;
    note?:string;
    code?:string;
    phone:string;
    mail?:string;

}
// used for get by id (provider card ) and editing option
export interface DetailedProvider extends InsertedProvider{
    id:string;
    contacts: PartialContact[];
}

// used for inserting new provider

export interface InsertedProvider extends MetaData{
    name?:string;
    note?:string;
    phone?:string;
    mail?:string;
    code?:string;
    FAX?:string;
    website?:string;
    addresses?:Address[];
    contacts?:InsertedContact[];
    affectedContacts?:string[];
}


export interface AffectedProvider{
    providerid?:string
}



