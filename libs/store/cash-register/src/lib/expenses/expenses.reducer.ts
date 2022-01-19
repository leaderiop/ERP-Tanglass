import { Action, createReducer, on } from '@ngrx/store';

import * as ExpensesActions from './expenses.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ExpensesCategory } from '@tanglass-erp/core/cash-register';

export const EXPENSES_FEATURE_KEY = 'expenses';

export interface State extends EntityState<ExpensesCategory> {
  loaded: boolean;
  error?: string | null; // last known error (if any)
}

export interface ExpensesPartialState {
  readonly [EXPENSES_FEATURE_KEY]: State;
}



export const ExpensesCategoriesAdapter: EntityAdapter<ExpensesCategory> = createEntityAdapter<
  ExpensesCategory
  >({
  selectId: obj =>obj.key
});

export const initialState: State = ExpensesCategoriesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  error: null,
});

const expensesReducer = createReducer(
  initialState,
  on(ExpensesActions.loadExpensesCategories, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ExpensesActions.loadExpensesCategoriesSuccess, (state, {expensesCategories}) =>
    ExpensesCategoriesAdapter.setAll(expensesCategories, {...state, loaded: true, error: null})
  ),
  on(ExpensesActions.addExpense, (state) => ({
    ...state,
    error: null,
  })),

  on(
    ExpensesActions.addExpenseFailure,
    ExpensesActions.loadExpensesCategoriesFailure,
    ExpensesActions.deleteExpenseFailure,
    (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return expensesReducer(state, action);
}
