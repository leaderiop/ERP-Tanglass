import { ServicesConfigService } from '@tanglass-erp/core/product';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ServiceActions from '../actions/servicesConfig.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ServiceEffects {
  loadServices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.loadServiceConfigs),
      mergeMap(() =>
        this.serviceConfigService.getAll().pipe(
          map((data) =>
            ServiceActions.loadServiceConfigsSuccess({
              serviceConfigs: data.data.product_serviceConfig,
            })
          ),
          catchError((error) =>
            of(ServiceActions.loadServiceConfigsFailure({ error }))
          )
        )
      )
    );
  });

  insertService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.addServiceConfig),
      mergeMap((action) =>
        this.serviceConfigService.insertOne(action.serviceConfig).pipe(
          map((data) =>
            ServiceActions.addServiceConfigSuccess({
              serviceConfig: data.data.insert_product_serviceConfig_one,
            })
          ),
          catchError((error) =>
            of(ServiceActions.addServiceConfigFailure({ error }))
          )
        )
      )
    );
  });

  updateService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.updateServiceConfig),
      mergeMap((action) =>
        this.serviceConfigService
          .update(
            action.serviceConfig.id,
            action.serviceConfig.labelFactory,
            action.serviceConfig.name
          )
          .pipe(
            map((data) =>
              ServiceActions.updateServiceConfigSuccess({
                serviceConfig: data.data.update_product_serviceConfig_by_pk,
              })
            ),
            catchError((error) =>
              of(ServiceActions.updateServiceConfigFailure({ error }))
            )
          )
      )
    );
  });

  getServiceById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.loadServiceConfigById),
      mergeMap((action) =>
        this.serviceConfigService.getOneById(action.id).pipe(
          map((data) =>
            ServiceActions.loadServiceConfigByIdSuccess({
              serviceConfig: data.data.product_serviceConfig_by_pk,
            })
          ),
          catchError((error) =>
            of(ServiceActions.loadServiceConfigByIdFailure({ error }))
          )
        )
      )
    );
  });

  addNewItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.addNewItem),
      mergeMap((action) =>
        this.serviceConfigService.addOneItem(action.item).pipe(
          map((data) =>
            ServiceActions.addNewItemSuccess({
              service: data.data.insert_product_service_one,
            })
          ),
          catchError((error) => of(ServiceActions.addNewItemFailure({ error })))
        )
      )
    );
  });
  removeManyItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.removeManyServices),
      mergeMap((action) =>
        this.serviceConfigService.removeManyItems(action.ids).pipe(
          map((data) =>
            ServiceActions.removeManyServicesSuccess({ ids: action.ids })
          ),
          catchError((error) =>
            of(ServiceActions.removeManyServicesFailure({ error }))
          )
        )
      )
    );
  });


  removeItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.removeServiceConfig),
      mergeMap((action) =>
        this.serviceConfigService.delete(action.serviceConfigId).pipe(
          map((data) =>
            ServiceActions.removeServiceConfigSuccess(
              { serviceConfigId: action.serviceConfigId})
          ),
          catchError((error) =>
            of(ServiceActions.removeServiceConfigFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private serviceConfigService: ServicesConfigService
  ) {}
}
