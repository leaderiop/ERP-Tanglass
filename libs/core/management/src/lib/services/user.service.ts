import { Inject, Injectable } from '@angular/core';
import {
  DeleteUserGQL,
  GetAllUsersGQL,
  GetUserByIdGQL,
  InsertUserGQL,
  InsertUserMutationVariables,
  UpdateUserGQL,
  UpdateUserMutationVariables
} from '@tanglass-erp/infrastructure/graphql';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface RequestSignUp {
  email: string;
  password: string;
  username?: string;
  [key: string]: any; // that means any other key:value
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  SIGNUP_PAGE = 'https://gxm.us.auth0.com/dbconnections/signup';
  constructor(
    private getAllGQL: GetAllUsersGQL,
    private getByIdGQL: GetUserByIdGQL,
    private insertOneGQL: InsertUserGQL,
    private updateOneGQL: UpdateUserGQL,
    private deleteOneGQL: DeleteUserGQL,
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.getAllGQL.watch().valueChanges
  }
  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id })
  }

  insertOne(createdOne: InsertUserMutationVariables) {
    return this.insertOneGQL.mutate(createdOne)
  }

  updateOne(updatedOne: UpdateUserMutationVariables) {
    return this.updateOneGQL.mutate(updatedOne)
  }

  removeOne(id: string) {
    return this.deleteOneGQL.mutate({ id })
  }

  signUp(data: RequestSignUp) {
    data.client_id = 'k35khcRkef3IyRQWkIBRLd7vwFA2guV5';
    data.connection = 'Username-Password-Authentication';
    return this.http.post(this.SIGNUP_PAGE, data);
  }
}
