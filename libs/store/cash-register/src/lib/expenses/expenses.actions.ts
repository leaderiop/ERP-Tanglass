import { createAction, props } from '@ngrx/store';
import { ExpensesCategory, InsertedExpenses } from '@tanglass-erp/core/cash-register';


// load ExpensesCategories

export const loadExpensesCategories = createAction(
  '[Expenses] load Expenses Categories');

export const loadExpensesCategoriesSuccess = createAction(
  '[Expenses] load Expenses Categories Success',
  props<{expensesCategories: ExpensesCategory[]}>()
);

export const loadExpensesCategoriesFailure = createAction(
  '[Expenses] load Expenses Categories Failure',
  props<{ error: any }>()
);

// add Expense

export const addExpense = createAction(
  '[Expenses] add Expense',
  props<{expense: InsertedExpenses}>()
  );

export const addExpenseSuccess = createAction(
  '[Expenses] add Expense Success');

export const addExpenseFailure = createAction(
  '[Expenses] add Expense Failure',
  props<{ error: any }>()
);

// delete Expense

export const deleteExpense = createAction(
  '[Expenses] delete Expense',
  props<{ids: number[]}>()
  );

export const deleteExpenseSuccess = createAction(
  '[Expenses] delete Expense Success');

export const deleteExpenseFailure = createAction(
  '[Expenses] delete Expense Failure',
  props<{ error: any }>()
);

