import {
  AffectContactProvider,
  DeleteAddress,
  DeleteAffectedContact,
  DetailedProvider,
  InsertAddressContact,
  InsertContact,
  Provider
} from '@tanglass-erp/core/contact';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD PROVIDERS ** */
/****************************************************************** */

export const loadProviders= createAction('[Providers Component] Load Providers');


export const loadProvidersSuccess = createAction(
  '[Provider Effect] Load Providers Success',
  props<{ providers: Provider[] }>()
);

export const loadProvidersFailure = createAction(
  '[Provider Effect] Load Providers Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL PROVIDER ** */
/****************************************************************** */

export const loadProviderById = createAction(
  '[Provider Card Component] Load Provider By Id',
  props<{ id: any }>()
  );


export const loadProviderByIdSuccess = createAction(
  '[Provider Effect] Load Provider By Id Success',
  props<{ provider: DetailedProvider }>()
);

export const loadProviderByIdFailure = createAction(
  '[Provider Effect] Load Provider By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL PROVIDER ** */
/****************************************************************** */

export const addProvider = createAction(
  '[Providers Component] Add Provider',
  props<{ provider: Provider }>()
);

export const addProviderSuccess = createAction(
  '[Provider Effect] Add Provider Success',
  props<{provider: Provider }>()
);

export const addProviderFailure = createAction(
  '[Provider Effect] Add Provider Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL PROVIDER ** */
/****************************************************************** */

export const updateProvider = createAction(
  '[Providers Component] Update Provider',
  props<{ provider: DetailedProvider }>()
);
export const updateProviderSuccess = createAction(
  '[Provider Effect] Update Provider Success',
  props<{ provider: Provider }>()
);
export const updateProviderFailure = createAction(
  '[Provider Effect] Update Provider failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL PROVIDER ** */
/****************************************************************** */

export const removeProvider = createAction(
  '[Providers Component] Delete Provider',
  props<{ providerId: any }>()
);
export const removeProviderSuccess = createAction(
  '[Provider Effect] Delete Provider Success',
  props<{ providerId: any }>()
);
export const removeProviderFailure = createAction(
  '[Provider Effect] Delete Provider failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD ADRESS TO Provider ** */
/****************************************************************** */

export const addAdressToProvider = createAction(
  '[Provider card Component] Add Adress To Provider',
  props<{ adress: InsertAddressContact }>()
);
export const addAdressToProviderSuccess = createAction(
  '[Provider Effect] Add Adress To Provider Success',
  props<{ adress: any }>()
);
export const addAdressToProviderFailure = createAction(
  '[Provider Effect] Add Adress To Provider failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD ADRESS TO Provider ** */
/****************************************************************** */

export const addContactToProvider = createAction(
  '[Provider card Component] Add Contact To Provider',
  props<{ contact: InsertContact }>()
);
export const addContactToProviderSuccess = createAction(
  '[Provider Effect] Add Contact To Provider Success',
  props<{ contact: any }>()
);
export const addContactToProviderFailure = createAction(
  '[Provider Effect] Add Contact To Provider failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****AFFECT ADRESS TO Provider ** */
/****************************************************************** */

export const affectContactToProvider = createAction(
  '[Provider card Component] affect Contact To Provider',
  props<{ contact: AffectContactProvider[] }>()
);
export const affectContactToProviderSuccess = createAction(
  '[Provider Effect] affect Contact To Provider Success',
  props<{ contact: any }>()
);
export const affectContactToProviderFailure = createAction(
  '[Provider Effect] affect Contact To Provider failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE ADRESS FROM Provider ** */
/****************************************************************** */

export const removeAdressFromProvider = createAction(
  '[Provider card Component] remove Adress from Provider',
  props<{ adress: DeleteAddress }>()
);
export const removeAdressFromProviderSuccess = createAction(
  '[Provider Effect] remove Adress from Provider Success',
  props<{ adress: any }>()
);
export const removeAdressFromProviderFailure = createAction(
  '[Provider Effect] remove Adress from Provider failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE CONTACT FROM Provider ** */
/****************************************************************** */

export const removeContactFromProvider = createAction(
  '[Provider card Component] remove Contact from Provider',
  props<{ contact: DeleteAffectedContact }>()
);
export const removeContactFromProviderSuccess = createAction(
  '[Provider Effect] remove Contact from Provider Success',
  props<{ contact: any }>()
);
export const removeContactFromProviderFailure = createAction(
  '[Provider Effect] remove Contact from Provider failure',
  props<{ error: any }>()
);
