import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InvoiceActions from './invoice.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InvoiceService, UpdatedInvoice } from '@tanglass-erp/core/sales';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '@TanglassTheme/services/toast.service';

@Injectable()
export class InvoiceEffects {
  loadinvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap((action) =>
        this.service
          .getAll({
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
          })
          .pipe(
            map((data) =>
              InvoiceActions.loadInvoicesSuccess({
                invoices: data.data.sales_invoice,
              })
            ),
            catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
          )
      )
    )
  );

  loadinvoiceById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoiceById),
      mergeMap((action) =>
        this.service.getOneById(action.id).pipe(
          map((data) => {
            const { __typename, ...invoice } = data.data.sales_invoice_by_pk;
            return InvoiceActions.loadInvoiceByIdSuccess({
              invoice: <UpdatedInvoice>invoice,
            });
          }),
          catchError((error) => of(InvoiceActions.loadInvoiceByIdFailure({ error })))
        )
      )
    )
  );

  prepareInvoiceLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.prepareInvoiceLines),
      mergeMap((action) =>
        this.service.prepareInvoiceLines(action.deliveries).pipe(
          map((data) =>
            InvoiceActions.prepareInvoiceLinesSuccess({ invoiceLines: data })
          ),
          catchError((error) =>
            of(InvoiceActions.prepareInvoiceLinesFailure({ error }))
          )
        )
      )
    )
  );

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.addInvoice),
      mergeMap((action) => {
        return this.service
          .prepareInvoiceLines(
            action.invoice.deliveries.map((e) => e.delivery_id)
          )
          .pipe(
            mergeMap((value) => {
              const invoice = {
                ...action.invoice,
                invoice_lines: value,
              };
              return this.service.insertOne(invoice);
            })
          )
          .pipe(
            map((data) => {
              this.toastService.showToast(
                'success',
                'Factures',
                'Ajouté avec succès',
              );
              this.router.navigate(
                ['sales/invoice/ready'],
                {
                  state: { data: data.data.insert_sales_invoice_one },
                }
              );
              return InvoiceActions.addInvoiceSuccess({
                invoice: data.data.insert_sales_invoice_one,
              });
            }),
            catchError((error) => of(InvoiceActions.addInvoiceFailure({ error })))
          );
      })
    )
  );

  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoice),
      mergeMap((action) =>
        this.service.updateOne(action.invoice).pipe(
          map((data) => {
            this.router.navigate(['sales/invoice']);
            this.toastService.showToast(
              'info',
              'Factures',
              'Mise à jour avec succès',
            );
            return InvoiceActions.updateInvoiceSuccess({
              invoice: data.data.update_sales_invoice_by_pk,
            });
          }),
          catchError((error) => of(InvoiceActions.updateInvoiceFailure({ error })))
        )
      )
    )
  );

  removeInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.deleteInvoices),
      mergeMap((action) =>
        this.service.deleteMany(action.ids).pipe(
          map((data) => {
            this.toastService.showToast(
              'info',
              'Factures',
              'Supprimé avec succès',
            );
            return InvoiceActions.deleteInvoicesSuccess({ ids: action.ids });
          }),
          catchError((error) => of(InvoiceActions.deleteInvoicesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: InvoiceService,
    private router: Router,
    private toastService: ToastService
  ) {}
}
