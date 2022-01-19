import { Injectable } from '@angular/core';
import {
  AddCustomerAddressGQL,
  AddCustomerContactGQL,
  AffectCustomerContactGQL,
  DeleteCustomerAddressGQL,
  DeleteCustomerContactGQL,
  DeleteCustomerGQL,
  DeleteManyCustomersGQL,
  GetAllCustomersGQL,
  GetCustomerByIdGQL,
  InsertCustomerGQL,
  InsertCustomerMutationVariables,
  UpdateCustomerGQL
} from '@tanglass-erp/infrastructure/graphql';
import { DetailedCustomer, InsertedCustomer } from '../models/customer.models';
import { dataAdapter } from '../utils/dataAdapter';
import {
  AffectContactCustomer,
  DeleteAddress,
  DeleteAffectedContact,
  InsertAddressContact,
  InsertContact
} from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private getAllGQL: GetAllCustomersGQL,
    private getByIdGQL: GetCustomerByIdGQL,
    private deleteOneGQL: DeleteCustomerGQL,
    private insertOneGQL: InsertCustomerGQL,
    private updateOneGQL: UpdateCustomerGQL,
    private deleteMany:DeleteManyCustomersGQL,
    private addCustomerAddressGQL:AddCustomerAddressGQL,
    private addCustomerContact:AddCustomerContactGQL,
    private affectCustomerContact:AffectCustomerContactGQL,
    private deleteCustomerAddress:DeleteCustomerAddressGQL,
    private deleteCustomerContactGQL:DeleteCustomerContactGQL,

    ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges
  }

  getOneById(id: string,) {
    return this.getByIdGQL.fetch({ id })
  }

  insertOne(createdOne: InsertedCustomer) {
    let addedValue: InsertCustomerMutationVariables;
    addedValue= dataAdapter(createdOne);
    return this.insertOneGQL.mutate(addedValue)
  }

  updateOne(updatedOne: DetailedCustomer) {
    return this.updateOneGQL.mutate(updatedOne)
  }


  removeOne(id: string) {
    return this.deleteOneGQL.mutate({ id })
  }

  removeMany(ids: string[]) {
    return this.deleteMany.mutate({ids})
  }

  //new methods for add/delete a cutomer addresses and add/affect contact to customer

  addAddress(value:InsertAddressContact){
    return this.addCustomerAddressGQL.mutate(value)
  }
  addContact(value:InsertContact) {
    return this.addCustomerContact.mutate({
      id: value.id,
      contact: {
        ...value.contact,
        addresses: {
          data: value.contact?.addresses
        },
        providers: {
          data: value.contact?.providers
        }
      }
    })
  }
  deleteContact(value:DeleteAffectedContact){
  return this.deleteCustomerContactGQL.mutate(value)
  }
  affectContact(value:AffectContactCustomer[]){
    return  this.affectCustomerContact.mutate({affectedContacts:value})
  }
  deleteAddress(value:DeleteAddress){
    return this.deleteCustomerAddress.mutate(value)
  }
}
