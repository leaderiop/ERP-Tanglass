import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EXPENSES_FEATURE_KEY, ExpensesCategoriesAdapter, ExpensesPartialState, State } from './expenses.reducer';

// Lookup the 'Expenses' feature state managed by NgRx
export const getExpensesState = createFeatureSelector<
  ExpensesPartialState,
  State
>(EXPENSES_FEATURE_KEY);

const { selectAll, selectEntities } = ExpensesCategoriesAdapter.getSelectors();

export const getExpensesCategoriesLoaded = createSelector(
  getExpensesState,
  (state: State) => state.loaded
);

export const getExpensesError = createSelector(
  getExpensesState,
  (state: State) => state.error
);

export const getAllExpensesCategories = createSelector(getExpensesState, (state: State) =>
  selectAll(state)
);
