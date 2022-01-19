import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuotationActions from './quotation.actions';
import { Product_draft, QuotationService } from '@tanglass-erp/core/sales';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductDraftFacade } from '../product-draft/product-draft.facade';
import { DraftFacade } from '../draft/draft.facade';
import { ToastService } from '@TanglassTheme/services/toast.service';

@Injectable()
export class QuotationEffects {
  loadQuotationsDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuotationActions.loadQuotations),
      mergeMap((action) =>
        this.quotationService
          .getAll({
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
          })
          .pipe(
            map((data) =>
              QuotationActions.loadQuotationsSuccess({
                quotations: data.data.sales_quotation,
              })
            ),
            catchError((error) =>
              of(QuotationActions.loadQuotationsFailure({ error }))
            )
          )
      )
    );
  });

  addQuotation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuotationActions.addQuotation),
      mergeMap((action) =>
        this.quotationService.insertOne(action.quotation).pipe(
          map((data) => {
            this.toastrService.showToast(
              'success',
              'Devis',
              'Ajouté avec succès',
            );
            this.router.navigate([
              'sales/quotation',
              data.data.insert_sales_quotation_one.id,
            ]);

            return QuotationActions.addQuotationSuccess({
              quotation: data.data.insert_sales_quotation_one,
            });
          }),
          catchError((error) =>
            of(QuotationActions.addQuotationFailure({ error }))
          )
        )
      )
    );
  });

  updateQuotation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuotationActions.updateQuotation),
      mergeMap((action) =>
        this.quotationService.updateOne(action.quotation).pipe(
          map((data) => {
            this.toastrService.showToast(
              'success',
              'Devis',
              'Mise à jour avec succès',
            );
            this.router.navigate([
              'sales/quotation',
            ]);
            return QuotationActions.updateQuotationSuccess({
              quotation: data.data.update_sales_quotation_by_pk,
            });
          }),
          catchError((error) =>
            of(QuotationActions.updateQuotationFailure({ error }))
          )
        )
      )
    );
  });


  getQuotationById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuotationActions.loadQuotationById),
      mergeMap((action) =>
        this.quotationService.getOneById(action.id).pipe(
          map((data) => {
            this.draftFacade.selectDraftId(data.draft_id);
           let products:Product_draft[]= data.products.map(productDB=>{
              let {__typename,...product}=productDB
              return product
            });
            this.productDraftFacade.setDraftProducts(products);
            return QuotationActions.loadQuotationByIdSuccess({
              quotation: {...data,products},
            });
          }),
          catchError((error) =>
            of(QuotationActions.loadQuotationByIdFailure({ error }))
          )
        )
      )
    );
  });

  deleteMany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuotationActions.deleteQuotations),
      mergeMap(({ ids }) =>
        this.quotationService.deleteMany(ids).pipe(
          take(1),
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Devis',
              'Supprimé avec succès',
            );
            return QuotationActions.deleteQuotationsSuccess({ ids });
          }),
          catchError((error) =>
            of(QuotationActions.deleteQuotationsFailure({ error }))
          )
        )
      )
    );
  });

  TransformQuotationToOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuotationActions.TransformToOrder),
      mergeMap((action) =>
        this.quotationService
          .transformQuotationToOrder(action.transformingVariables)
          .pipe(
            map((data) => {
              this.toastrService.showToast(
                'success',
                'Devis',
                'Transférée au Commande avec succès',
              );
              this.router.navigate([
                'sales/order',
                data.data.insert_sales_order_one.id,
              ]);

              return QuotationActions.TransformToOrderSuccess({
                order: data.data.insert_sales_order_one,
              });
            }),
            catchError((error) =>
              of(QuotationActions.TransformToOrderFailure({ error }))
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private quotationService: QuotationService,
    private router: Router,
    private productDraftFacade: ProductDraftFacade,
    private toastrService: ToastService,
    private draftFacade: DraftFacade
  ) {}
}
