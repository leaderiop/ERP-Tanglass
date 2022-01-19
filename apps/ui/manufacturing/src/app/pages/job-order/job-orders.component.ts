import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErpPermissions, GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { JobOrdersFacade } from '@tanglass-erp/store/manufacturing';
import { JobOrderHeaders } from '@TanglassUi/manufacturing/utils/grid-headers';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { JobOrderPermissions } from '@TanglassUi/manufacturing/utils/permissions';

@Component({
  selector: 'ngx-job-orders',
  templateUrl: './job-orders.component.html',
  styleUrls: ['./job-orders.component.scss']
})

export class JobOrdersComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.allJobOrders$;
  permissions: ErpPermissions = JobOrderPermissions.get(
    this.authFacadeService.currentUser.role
  );

  constructor(
    public dialog: MatDialog,
    private router: Router,
    protected facade:JobOrdersFacade,
    private authFacadeService: AuthFacadeService,
  ) {
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.facade.loadAllJobOrders();
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.delete:
        break;
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...JobOrderHeaders,
    ];
  }

}
