import { Injectable } from '@angular/core';
import { GetAllServicesGQL } from '@tanglass-erp/infrastructure/graphql';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(
    private getAllGQL: GetAllServicesGQL) {}
  getAll() {
    return this.getAllGQL.watch().valueChanges
  }

}
