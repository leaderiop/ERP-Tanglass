import { Injectable } from '@angular/core';
import { AddExpenseGQL, DeleteExpensesByIdGQL, GetExpensesCategoriesGQL } from '@tanglass-erp/infrastructure/graphql';
import { InsertedExpenses } from '../models/expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(
    private addExpenseGQL: AddExpenseGQL,
    private deleteExpensesByIdGQL: DeleteExpensesByIdGQL,
    private getExpensesCategoriesGQL: GetExpensesCategoriesGQL,
  ) {}

  getExpensesCategories() {
    return this.getExpensesCategoriesGQL.fetch();
  }

  addExpense(obj: InsertedExpenses) {
    return this.addExpenseGQL.mutate(obj);
  }

  deleteExpense(ids: number[]) {
    return this.deleteExpensesByIdGQL.mutate({ ids });
  }
}
