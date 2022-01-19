import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ErpPermissions,
  GridView,
  MainGridComponent,
  Operations,
} from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { StockAdjustmentHeaders } from '@TanglassUi/inventory/utils/grid-headers';
import { Router } from '@angular/router';
import { StockAdjustmentsFacade } from '@tanglass-erp/store/inventory';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { StockAdjustementStockPermissions } from '@TanglassUi/inventory/utils/permissions';
import { ROLES } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.scss'],
})
export class StockAdjustmentComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.allStockAdjustments$;
  permissions: ErpPermissions;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private facade: StockAdjustmentsFacade,
    private authFacadeService: AuthFacadeService
  ) {
    this.setColumnDefs();
    this.authFacadeService.currentUser$.subscribe((data) => {
      this.permissions = StockAdjustementStockPermissions.get(
        data.role as ROLES
      );
    });
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.facade.loadStockAdjustments();
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
        this.router.navigateByUrl('inventory/stockAdjustment/createAdjustment');
        break;
      case Operations.update:
        break;
      //   case Operations.delete:
      //     this.facade.removeMany(event.data.map((e) => e.id));
      //     break;
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [...StockAdjustmentHeaders];
  }
}
