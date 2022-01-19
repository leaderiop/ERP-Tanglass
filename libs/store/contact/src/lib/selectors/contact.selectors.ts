import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CONTACT_FEATURE_KEY, contactAdapter, State } from '../reducers/contact.reducer';

// Lookup the 'Contacts' feature state managed by NgRx
export const getContactsState = createFeatureSelector<
State
>(CONTACT_FEATURE_KEY);

const { selectAll, selectEntities } = contactAdapter.getSelectors();


export const getContactsLoaded = createSelector(
  getContactsState,
  (state: State) => state.loaded
);

export const getContactsError = createSelector(
  getContactsState,
  (state: State) => state.error
);


export const getAllContacts = createSelector(
  getContactsState,
  (state: State) => selectAll(state)
);

export const getContactEntities = createSelector(
  getContactsState,
  (state: State) => selectEntities(state)
);

export const getSelectedContact = createSelector(
  getContactsState,
  (state: State) => state.selectedContact
);
