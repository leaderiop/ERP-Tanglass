import { Injectable } from '@angular/core';
import * as ServiceConfigActions from '../actions/servicesConfig.actions';
import { Action, Store } from '@ngrx/store';
import * as ServiceReducers from '../reducers/service.reducer';
import * as ServiceConfigSelectors from '../selectors/serviceConfig.selectors';
import * as ServiceConfigReducers from '../reducers/servicesConfig.reducer';
import { InsertedServiceConfig, ServiceConfig } from '@tanglass-erp/core/product';
import * as ServiceGroupeActions from '@TanglassStore/product/lib/actions/servicesConfig.actions';

@Injectable({
  providedIn: 'root'
})
export class ServiceFacadeService {
  services$ = this.store.select(ServiceConfigSelectors.getAllServiceConfigs);
  constructor(
    private store: Store<ServiceReducers.servicePartialState | ServiceConfigReducers.servicePartialState>
  ) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAll() {
    this.dispatch(ServiceConfigActions.loadServiceConfigs());
  }

  add(serviceConfig: InsertedServiceConfig) {
    this.dispatch(ServiceGroupeActions.addServiceConfig(
      { serviceConfig: serviceConfig }
    ));
  }

  update(serviceConfig: ServiceConfig) {
    this.dispatch(ServiceGroupeActions.updateServiceConfig(
      { serviceConfig }
    ));
  }

  delete(serviceConfigId: string) {
    this.dispatch(ServiceConfigActions.removeServiceConfig({serviceConfigId}))
  }

}
