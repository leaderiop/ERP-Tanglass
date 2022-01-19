import { Injectable } from '@angular/core';
import { GetAllSubstancesGQL } from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { flattenObj } from '@tanglass-erp/core/common';
import { Substance } from '@tanglass-erp/core/product';

@Injectable({
  providedIn: 'root',
})
export class SubstanceService {
  constructor(private getAllGQL: GetAllSubstancesGQL) {
    this.getAll()
  }
  getAll() {
    return this.getAllGQL
      .watch()
      .valueChanges.pipe(
        map((data) =>
          data.data.product_substance.map((substance) => flattenObj(substance) as Substance)
        )
      );
  }
}
