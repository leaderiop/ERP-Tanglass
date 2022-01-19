import { Component, Input } from '@angular/core';
import { ErpPermissions, GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { ExpensesFacade } from '@tanglass-erp/store/cash-register';
import { DialogExpenseComponent } from '@TanglassUi/cash-register/components/dialog-expense/dialog-expense.component';
import { ActivatedRoute } from '@angular/router';
import { ExpensesHeaders } from '@TanglassUi/cash-register/utils/grid-headers';

@Component({
  selector: 'ngx-expenses-grid',
  templateUrl: './expenses-grid.component.html',
  styleUrls: ['./expenses-grid.component.scss']
})
export class ExpensesGridComponent implements GridView {

  constructor(
    public dialog: MatDialog,
    private expensesFacade:ExpensesFacade,
    private route: ActivatedRoute
  ) {
    this.setColumnDefs();
  }

  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  @Input() data$;
  mainGrid: MainGridComponent;
  permissions: ErpPermissions = {
    update: false
  };

  setColumnDefs(): void {
    this.columnDefs = ExpensesHeaders;
  }

  openDialog(action, data) {
    const dialogRef = this.dialog.open(DialogExpenseComponent, {
      width: '800px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        if (action === Operations.add) {
          this.expensesFacade.addExpense(result);
        }
    });
  }

  eventTriggering(event) {
    switch (event.action) {
      case Operations.add:
        this.openDialog(event.action, {
          ...event.data,
          cash_box_id: parseInt(this.route.snapshot.paramMap.get('cashbox'), 10)
        });
        break;
      case Operations.delete:
        this.expensesFacade.deleteExpense(event.data.map(e =>e.id));
        break;
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }


}
