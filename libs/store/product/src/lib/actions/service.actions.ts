import { DetailedService, Service } from '@tanglass-erp/core/product';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD ServiceS ** */
/****************************************************************** */

export const loadServices= createAction('[Services Component] Load Services');


export const loadServicesSuccess = createAction(
  '[Service Effect] Load Services Success',
  props<{ services: Service[] }>()
);

export const loadServicesFailure = createAction(
  '[Service Effect] Load Services Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL Service ** */
/****************************************************************** */

export const loadServiceById = createAction(
  '[Service Card Component] Load Service By Id',
  props<{ id: any }>()
  );


export const loadServiceByIdSuccess = createAction(
  '[Service Effect] Load Service By Id Success',
  props<{ service: DetailedService }>()
);

export const loadServiceByIdFailure = createAction(
  '[Service Effect] Load Service By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL Service ** */
/****************************************************************** */

export const addService = createAction(
  '[List services Component] Add Service',
  props<{ service: Service }>()
);

export const addServiceSuccess = createAction(
  '[Service Effect] Add Service Success',
  props<{ service: Service }>()
);

export const addServiceFailure = createAction(
  '[Service Effect] Add Service Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Service ** */
/****************************************************************** */

export const updateService = createAction(
  '[List services Component] Update Service',
  props<{ service: Service }>()
);
export const updateServiceSuccess = createAction(
  '[Service Effect] Update Service Success',
  props<{ service: Service }>()
);
export const updateServiceFailure = createAction(
  '[Service Effect] Update Service failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Service ** */
/****************************************************************** */

export const removeService = createAction(
  '[List services Component] Update Service',
  props<{ service: Service }>()
);
export const removeServiceSuccess = createAction(
  '[Service Effect] Update Service Success',
  props<{ service: Service }>()
);
export const removeServiceFailure = createAction(
  '[Service Effect] Update Service failure',
  props<{ error: any }>()
);
