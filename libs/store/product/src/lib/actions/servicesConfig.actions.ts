import {
  DetailedServiceConfig,
  InsertedService,
  InsertedServiceConfig,
  Service,
  ServiceConfig
} from '@tanglass-erp/core/product';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD ServiceConfigS ** */
/****************************************************************** */

export const loadServiceConfigs= createAction('[ServiceConfigs Component] Load ServiceConfigs');


export const loadServiceConfigsSuccess = createAction(
  '[ServiceConfig Effect] Load ServiceConfigs Success',
  props<{ serviceConfigs: ServiceConfig[] }>()
);

export const loadServiceConfigsFailure = createAction(
  '[ServiceConfig Effect] Load ServiceConfigs Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL ServiceConfig ** */
/****************************************************************** */

export const loadServiceConfigById = createAction(
  '[ServiceConfig Card Component] Load ServiceConfig By Id',
  props<{ id: any }>()
  );


export const loadServiceConfigByIdSuccess = createAction(
  '[ServiceConfig Effect] Load ServiceConfig By Id Success',
  props<{ serviceConfig: DetailedServiceConfig }>()
);

export const loadServiceConfigByIdFailure = createAction(
  '[ServiceConfig Effect] Load ServiceConfig By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL ServiceConfig ** */
/****************************************************************** */

export const addServiceConfig = createAction(
  '[ServiceConfigs Component] Add ServiceConfig',
  props<{ serviceConfig: InsertedServiceConfig }>()
);

export const addServiceConfigSuccess = createAction(
  '[ServiceConfig Effect] Add ServiceConfig Success',
  props<{ serviceConfig: ServiceConfig }>()
);

export const addServiceConfigFailure = createAction(
  '[ServiceConfig Effect] Add ServiceConfig Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL ServiceConfig ** */
/****************************************************************** */

export const updateServiceConfig = createAction(
  '[ServiceConfigs Component] Update ServiceConfig',
  props<{ serviceConfig: ServiceConfig }>()
);
export const updateServiceConfigSuccess = createAction(
  '[ServiceConfig Effect] Update ServiceConfig Success',
  props<{ serviceConfig: ServiceConfig }>()
);
export const updateServiceConfigFailure = createAction(
  '[ServiceConfig Effect] Update ServiceConfig failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL ServiceConfig ** */
/****************************************************************** */

export const removeServiceConfig = createAction(
  '[ServiceConfigs Component] Delete ServiceConfig',
  props<{ serviceConfigId: any }>()
);
export const removeServiceConfigSuccess = createAction(
  '[ServiceConfig Effect] Delete ServiceConfig Success',
  props<{ serviceConfigId: any }>()
);
export const removeServiceConfigFailure = createAction(
  '[ServiceConfig Effect] Delete ServiceConfig failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD NEW ITEM TO SERVICE ** */
/****************************************************************** */

export const addNewItem = createAction(
  '[ServiceConfigs Component] add new Item to  ServiceConfig',
  props<{ item: InsertedService}>()
);
export const addNewItemSuccess = createAction(
  '[ServiceConfig Effect] add new Item to ServiceConfig Success',
  props<{ service: Service }>()
);
export const addNewItemFailure = createAction(
  '[ServiceConfig Effect] add new Item to ServiceConfig failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE MANY Services ** */
/****************************************************************** */

export const removeManyServices = createAction(
  '[Services Component] Delete ManyServices',
  props<{ ids: string[] }>()
);
export const removeManyServicesSuccess = createAction(
  '[ServicesEffect] Delete ManyServices Success',
  props<{ ids: string[] }>()
);
export const removeManyServicesFailure = createAction(
  '[Services Effect] Delete ManyServices failure',
  props<{ error: any }>()
);
