import { Injectable } from '@angular/core';
import {
  AddGlassColorGQL,
  AddGlassTypeGQL,
  DeleteManyGQL,
  DeleteOneGQL,
  GetAllGlassesGQL,
  GetGlassByIdGQL,
  GetGlassColorsGQL,
  GetGlassTypesGQL,
  InsertGlassGQL,
  InsertGlassMutationVariables,
  UpdateGlassGQL,
  UpdateGlassMutationVariables
} from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { InsertedGlass } from '../models/glass.model';
import { adaptProduct, adaptProductToUpdate } from '../utils/dataAdapter';

@Injectable({
  providedIn: 'root',
})
export class GlassService {
  constructor(
    private getAllGQL: GetAllGlassesGQL,
    private getByIdGQL: GetGlassByIdGQL,
    private insertOneGQL: InsertGlassGQL,
    private deleteOneGQL: DeleteOneGQL,
    private deleteMany: DeleteManyGQL,
    private getGlassTypesGQL: GetGlassTypesGQL,
    private addGlassColorGQL: AddGlassColorGQL,
    private addGlassTypeGQL: AddGlassTypeGQL,
    private getGlassColorsGQL: GetGlassColorsGQL,
    private updateGlassGQL: UpdateGlassGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges;
  }

  getOneById(id: string) {
    return this.getByIdGQL.fetch({ id });
  }

  insertOne(createdOne: InsertedGlass) {
    let addeValue: InsertGlassMutationVariables = adaptProduct(
      createdOne,
      'glasse'
    );
    return this.insertOneGQL.mutate(addeValue);
  }

  updateGlass(glass: InsertedGlass) {
    const updatedValue: UpdateGlassMutationVariables = adaptProductToUpdate(glass, 'glasse');
    return this.updateGlassGQL.mutate(updatedValue);
  }

  removeOne(code: string) {
    return this.deleteOneGQL.mutate({ code });
  }

  removeMany(codes: string[]) {
    return this.deleteMany.mutate({ codes });
  }

  addType(type: string) {
    return this.addGlassTypeGQL.mutate({ type });
  }
  addColor(color: string) {
    return this.addGlassColorGQL.mutate({ color });
  }

  getTypes() {
    return this.getGlassTypesGQL
      .watch()
      .valueChanges.pipe(
        map((data) => data.data.product_glassType.map((res) => res.type))
      );
  }
  getColors() {
    return this.getGlassColorsGQL
      .watch()
      .valueChanges.pipe(
        map((data) => data.data.product_glassColor.map((res) => res.color))
      );
  }
}
