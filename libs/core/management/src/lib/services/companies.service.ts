import { Injectable } from '@angular/core';
import {
  DeleteCompanyGQL,
  GetAllCompaniesGQL,
  GetCompanyByIdGQL,
  InsertCompanyGQL,
  InsertCompanyMutationVariables,
  UpdateCompanyGQL,
  UpdateCompanyMutationVariables
} from '@tanglass-erp/infrastructure/graphql';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {


  constructor(
    private getAllGQL: GetAllCompaniesGQL,
    private getByIdGQL: GetCompanyByIdGQL,
    private insertOneGQL: InsertCompanyGQL,
    private updateOneGQL: UpdateCompanyGQL,
    private deleteOneGQL: DeleteCompanyGQL,

  ) {

   }


  getAll() {
    return this.getAllGQL.watch().valueChanges
  }
  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id })
  }

  insertOne(createdOne: InsertCompanyMutationVariables) {
    return this.insertOneGQL.mutate(createdOne)

  }
  updateOne(updatedOne: UpdateCompanyMutationVariables) {
    return this.updateOneGQL.mutate(updatedOne)
  }

  removeOne(id: string) {
    return this.deleteOneGQL.mutate({ id })
  }

}
