import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromExpenses from './expenses.reducer';
import * as ExpensesSelectors from './expenses.selectors';
import * as ExpensesActions from './expenses.actions';
import { InsertedExpenses } from '@tanglass-erp/core/cash-register';

@Injectable()
export class ExpensesFacade {
  loaded$ = this.store.pipe(select(ExpensesSelectors.getExpensesCategoriesLoaded));
  allCategoryExpenses$ = this.store.pipe(select(ExpensesSelectors.getAllExpensesCategories));

  constructor(private store: Store<fromExpenses.ExpensesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAllCategoryExpenses() {
    this.dispatch(ExpensesActions.loadExpensesCategories());
  }

  addExpense(expense: InsertedExpenses) {
    this.dispatch(ExpensesActions.addExpense({expense}));
  }

  deleteExpense(ids: number[]) {
    this.dispatch(ExpensesActions.deleteExpense({ids}));
  }
}
