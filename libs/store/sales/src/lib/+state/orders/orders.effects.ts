import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '@tanglass-erp/core/sales';
import * as OrdersActions from './orders.actions';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductDraftFacade } from '../product-draft/product-draft.facade';
import { DraftFacade } from '../draft/draft.facade';
import { PaymentsFacade } from '../payments/payments.facade';
import { ToastService } from '@TanglassTheme/services/toast.service';


@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap((action) =>
        this.orderService
          .getAll({
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
          })
          .pipe(
            map((data) =>
              OrdersActions.loadOrdersSuccess({ orders: data.data.sales_order })
            ),
            catchError((error) =>
              of(OrdersActions.loadOrdersFailure({ error }))
            )
          )
      )
    );
  });

  removeOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.removeOrders),
      mergeMap(({ ids }) =>
        this.orderService.removeMany(ids).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Commandes',
              'Supprimé avec succès',
            );
            return OrdersActions.removeOrderSuccess({ ids });
          }),
          catchError((error) => of(OrdersActions.removeOrderFailure({ error })))
        )
      )
    );
  });

  addOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.addOrder),
      mergeMap((action) =>
        this.orderService.insertOne(action.order).pipe(
          map((data) => {
            this.toastrService.showToast(
              'success',
              'Commandes',
              'Ajouté avec succès',
            );
            this.router.navigate([
              '/sales/order',
              data.data.insert_sales_order_one.id,
            ]);
            return OrdersActions.addOrderSuccess({
              order: data.data.insert_sales_order_one,
            });
          }),
          catchError((error) => of(OrdersActions.addOrderFailure({ error })))
        )
      )
    );
  });

  getOrderById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.loadOrderById),
      switchMap((action) =>
        this.orderService.getOneById(action.id).pipe(
          map((data) => {
            this.draftFacade.selectDraftId(data.draft_id);
            const products = data.products.map((data) => {
              const { __typename, ...product } = data;
              return product;
            });
            this.productDraftFacade.setDraftProducts(products);
            this.paymentFacade.setOrderPayments(data.payments);
            return OrdersActions.loadOrderByIdSuccess({ order: data });
          }),
          catchError((error) =>
            of(OrdersActions.loadOrderByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      mergeMap((action) =>
        this.orderService.updateOrder(action.order).pipe(
          map((data) => {
            this.toastrService.showToast(
              'success',
              'Commandes',
              'La Commande est mise à jour avec succès',
            );
            this.router.navigate([
              '/sales/order',
               data.data.update_sales_order_by_pk.id,
            ]);
            return OrdersActions.updateOrderSuccess({
              order: data.data.update_sales_order_by_pk,
            });
          }),
          catchError((error) => of(OrdersActions.updateOrderFailure({ error })))
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router,
    private productDraftFacade: ProductDraftFacade,
    private toastrService: ToastService,
    private draftFacade: DraftFacade,
    private paymentFacade: PaymentsFacade,
  ) {}
}
