import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErpPermissions,GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { QuotationHeaders } from '@TanglassUi/sales/utils/grid-headers';
import { Router } from '@angular/router';
import { QuotationFacade } from '@tanglass-erp/store/sales';
import startOfMonth from 'date-fns/fp/startOfMonth';
import { fr } from 'date-fns/locale';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { QuotationPermissions } from '@TanglassUi/sales/utils/permissions';
import { rolesDirection } from '@tanglass-erp/core/management';


@Component({
  selector: 'ngx-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.allQuotation$;
  dateText: string;
  permissions: ErpPermissions ;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private facade: QuotationFacade,
    private authFacadeService: AuthFacadeService,

  ) {
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    const date = new Date();
    this.dateText = date.getFullYear() + ' ' + fr.localize.month(date.getMonth(), { width: 'abbreviated' });
    this.facade.loadAllQuotations({
      dateStart: startOfMonth(date), dateEnd: new Date()
    });
    this.authFacadeService.currentUser$.subscribe(
      (user) =>
        (this.permissions = QuotationPermissions.get(user.role as rolesDirection))
    );
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
        this.router.navigateByUrl('sales/quotation/createQuotation');
        break;
      case Operations.update:
        this.router.navigateByUrl(`sales/quotation/update/${event.data.id}`)
        break;
      case Operations.delete:
        this.facade.removeMany(event.data.map(e => e.id));
        break;
      case Operations.dateChange:
        this.facade.loadAllQuotations(event.data);
        break;
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...QuotationHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn" }
    ];
  }
}
