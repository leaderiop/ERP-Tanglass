import { Component } from '@angular/core';
import { ErpPermissions,GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { InvoiceFacade } from '@tanglass-erp/store/sales';
import { invoiceHeaders } from '@TanglassUi/sales/utils/grid-headers';
import { Router } from '@angular/router';
import { fr } from 'date-fns/locale';
import startOfMonth from 'date-fns/fp/startOfMonth';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { InvoicePermissions } from '@TanglassUi/sales/utils/permissions';
import { rolesDirection } from '@tanglass-erp/core/management';

@Component({
  selector: 'ngx-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements GridView {
  agGrid: AgGridAngular;
  columnDefs;
  columnId = 'id';
  data$ = this.invoiceFacade.allInvoices$;
  mainGrid: MainGridComponent;
  dateText: string;
  permissions: ErpPermissions 
  constructor(private router: Router, private invoiceFacade: InvoiceFacade,
    private authFacadeService: AuthFacadeService,
    ) {
    this.setColumnDefs();
  }

  ngOnInit(): void {
    const date = new Date();
    this.dateText = date.getFullYear() + ' ' + fr.localize.month(date.getMonth(), { width: 'abbreviated' });
    this.invoiceFacade.loadAll({
      dateStart: startOfMonth(date), dateEnd: new Date()
    });
    this.authFacadeService.currentUser$.subscribe(
      (user) =>
        (this.permissions = InvoicePermissions.get(user.role as rolesDirection))
    );
  }

  eventTriggering(event) {
    switch (event.action) {
      case Operations.add:
        this.router.navigate(['sales/invoice/add']);
        break;
      case Operations.update:
        this.router.navigate(['sales/invoice/update', {id: event.data.id}]);
        break;
      case Operations.delete:
        this.invoiceFacade.deleteMany(event.data.map((e) => e.id));
        break;
      case Operations.dateChange:
        this.invoiceFacade.loadAll(event.data);
        break;
    }
  }

  ngAfterViewInit(): void {}

  setColumnDefs(): void {
    this.columnDefs = [
      ...invoiceHeaders,
      {
        field: 'id',
        headerName: 'Action',
        type: 'editColumn',
      },
    ];
  }
}
