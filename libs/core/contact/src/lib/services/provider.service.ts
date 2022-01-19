import { Injectable } from '@angular/core';
import {
  AddProviderAddressGQL,
  AddProviderContactGQL,
  AffectProviderContactGQL,
  DeleteManyProvidersGQL,
  DeleteProviderAddressGQL,
  DeleteProviderContactGQL,
  DeleteProviderGQL,
  GetAllProvidersGQL,
  GetProviderByIdGQL,
  InsertProviderGQL,
  InsertProviderMutationVariables,
  UpdateProviderGQL
} from '@tanglass-erp/infrastructure/graphql';
import { DetailedProvider, InsertedProvider } from '../models/provider.models';
import { dataAdapter } from '../utils/dataAdapter';
import {
  AffectContactProvider,
  DeleteAddress,
  DeleteAffectedContact,
  InsertAddressContact,
  InsertContact
} from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private getAllGQL: GetAllProvidersGQL,
    private getByIdGQL: GetProviderByIdGQL,
    private insertOneGQL: InsertProviderGQL,
    private updateOneGQL: UpdateProviderGQL,
    private deleteOneGQL: DeleteProviderGQL,
    private deleteMany:DeleteManyProvidersGQL,
    private addProviderAddressGQL:AddProviderAddressGQL,
    private addProviderContact:AddProviderContactGQL,
    private affectProviderContact:AffectProviderContactGQL,
    private deleteProviderAddress:DeleteProviderAddressGQL,
    private deleteProviderContactGQL:DeleteProviderContactGQL,

  ) {}




  getAll() {
    return this.getAllGQL.watch().valueChanges
  }

  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id })
  }

  insertOne(createdOne:InsertedProvider) {
    let addedValue: InsertProviderMutationVariables;
    addedValue= dataAdapter(createdOne);

    return this.insertOneGQL.mutate(addedValue)


  }
  updateOne(updatedOne:DetailedProvider ) {
    return this.updateOneGQL.mutate(updatedOne)
  }

  removeOne(id: string) {
    return this.deleteOneGQL.mutate({ id })
  }

  removeMany(ids: string[]) {
    return this.deleteMany.mutate({ids})
  }
  //new methods for add/delete a provider addresses and add/affect contact to provider

  addAddress(value:InsertAddressContact){
    return this.addProviderAddressGQL.mutate(value)
  }

  addContact(value:InsertContact) {
    return this.addProviderContact.mutate({
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
    return this.deleteProviderContactGQL.mutate(value)
    }

  affectContact(value:AffectContactProvider[]){
    return this.affectProviderContact.mutate({affectedContacts:value})
  }

  deleteAddress(value:DeleteAddress){
    return this.deleteProviderAddress.mutate(value)
  }

}
