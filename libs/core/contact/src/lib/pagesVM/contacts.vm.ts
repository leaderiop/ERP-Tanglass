import { Contact, DetailedContact } from '../models/contact.models';

//list of Contacts
export interface ContactsVM {
    contacts:Contact[];
    loading:boolean;
    error?: string;
}


//Contact fiche
export interface DetailedContactVM{
    contact:DetailedContact;
    loading:boolean;
    error?:string;
}
