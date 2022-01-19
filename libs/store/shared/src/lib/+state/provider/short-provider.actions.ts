import { createAction, props } from '@ngrx/store';
import { ShortProvider } from '@tanglass-erp/core/common';

export const loadShortProvider = createAction(
  '[ShortProvider] Load ShortProvider'
);

export const loadShortProviderSuccess = createAction(
  '[ShortProvider] Load ShortProvider Success',
  props<{ shortProvider: ShortProvider[] }>()
);

export const loadShortProviderFailure = createAction(
  '[ShortProvider] Load ShortProvider Failure',
  props<{ error: any }>()
);
