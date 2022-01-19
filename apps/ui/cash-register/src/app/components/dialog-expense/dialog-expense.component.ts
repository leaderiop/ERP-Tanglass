import { Component, Inject } from '@angular/core';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsertedExpenses } from '@tanglass-erp/core/cash-register';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { regConfigExpense } from '@TanglassUi/cash-register/utils/forms';
import { ExpensesFacade } from '@tanglass-erp/store/cash-register';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-dialog-expense',
  templateUrl: './dialog-expense.component.html',
  styleUrls: ['./dialog-expense.component.scss']
})
export class DialogExpenseComponent extends FormDialog {
  title = "Dépense";
  employees$ = this.facade.allShortEmployees$;
  categories$ = this.expensesFacade.allCategoryExpenses$
    .pipe(map(values => values.map(e => ({key: e.value, value: e.value}))));

  constructor(
    public dialogRef: MatDialogRef<DialogExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InsertedExpenses,
    private facade: SharedFacade,
    private expensesFacade: ExpensesFacade,
  ) {
    super(dialogRef, data);
  }

  regConfig: FieldConfig[];

  buildForm(): void {
    this.facade.loadAllEmployees();
    this.expensesFacade.loadAllCategoryExpenses();
    this.regConfig = regConfigExpense(this.data, this.categories$, this.employees$);
  }

  submit(value) {
    super.submit({
      ...this.data,
      ...value
    })
  }

}
