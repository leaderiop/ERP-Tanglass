import { CustomerProductService } from '@tanglass-erp/core/product';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CustomerProductActions from '../actions/customer-product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from '../actions/product.actions';

@Injectable()
export class CutomerProductEffects {

  loadCustomerProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerProductActions.loadCustomerProducts),
      mergeMap(() =>
        this.customerProductService.getAll().pipe(
          map((data) =>
          CustomerProductActions.loadCustomerProductsSuccess({customerProduct: data.data.product_customer_product})
          ),
          catchError((error) =>
            of(CustomerProductActions.loadCustomerProductsFailure({ error }))
          )
        )
      )
    )
  });

  insertCustomerProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerProductActions.addCustomerProduct),
      mergeMap((action) =>
        this.customerProductService.insertOne(action.customerProduct).pipe(
          map((data) =>
          CustomerProductActions.addCustomerProductSuccess({customerProduct: data.data.insert_product_customer_product_one})
          ),
          catchError((error) =>
            of(CustomerProductActions.addCustomerProductFailure({ error }))
          )
        )
      )
    )
  });

  removeCustomerProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerProductActions.removeCustomerProduct),
      mergeMap((action) =>
        this.customerProductService.removeOne(action.customerProductId).pipe(
          map((data) =>
          CustomerProductActions.removeCustomerProductuccess({customerProductId: data.data.delete_product_product_by_pk})
          ),
          catchError((error) =>
            of(CustomerProductActions.removeCustomerProductFailure({ error }))
          )
        )
      )
    )
  });
  removeManyCustomersItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.removeManyProducts),
      mergeMap((action) =>
        this.customerProductService.removeMany( action.codes ).pipe(
          map((data) =>
          ProductsActions.removeManyProductsSuccess({  codes: action.codes  })
          ),
          catchError((error) =>
            of(ProductsActions.removeManyProductsFailure({ error }))
          )
        )
      )
    )
  });




  constructor(private actions$: Actions,
              private customerProductService: CustomerProductService) {}
}
