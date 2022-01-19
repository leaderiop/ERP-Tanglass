import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ContactsActions from '../actions/contact.actions';
import { Contact, DetailedContact } from '@tanglass-erp/core/contact';

export const CONTACT_FEATURE_KEY = 'contacts';


export interface State extends EntityState<Contact> {
  selectedContact: DetailedContact
  loaded: boolean; // has the Contact list been loaded
  error?: string | null; // last known error (if any)
}

export interface contactPartialState {
  readonly [CONTACT_FEATURE_KEY]: State;
}

export const contactAdapter: EntityAdapter<Contact> = createEntityAdapter<
Contact
>();

export const initialState: State = contactAdapter.getInitialState({
  // set initial required properties
  selectedContact: null,
  loaded: false,
  error: null,
});

const ContactReducer = createReducer<State>(
  initialState,
  on( ContactsActions.loadContactsSuccess,
      (state, action)  => contactAdapter.setAll(action.contacts,
        {
         ...state,
         loaded: true
        })
  ),
  on( ContactsActions.loadContactByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedContact: action.contact,
      }
    )
),
  on( ContactsActions.loadContactById,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedContact: null,
      }
    )
),
  on(ContactsActions.addContactSuccess,
    (state, action) => contactAdapter.addOne(action.contact, state)
  ),
  on(ContactsActions.updateContactSuccess, (state, action) =>
     contactAdapter.upsertOne(action.contact, state)
  ),
  on(ContactsActions.removeContactSuccess, (state, action) =>
     contactAdapter.removeOne(action.contactId, state)
  ),
  on(ContactsActions.loadContactsFailure,
     ContactsActions.updateContactFailure,
     ContactsActions.addContactFailure,
     ContactsActions.loadContactByIdFailure,
     ContactsActions.removeContactFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ContactReducer(state, action);
}
