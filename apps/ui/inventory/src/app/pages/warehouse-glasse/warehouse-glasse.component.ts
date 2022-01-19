import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import {
  ErpPermissions,
  GridView,
  MainGridComponent,
  Operations,
} from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { GlassWarehouseHeaders } from '@TanglassUi/inventory/utils/grid-headers';
import * as GlassWarehousActions from '@TanglassStore/inventory/lib/actions/warehouseGlass.actions';
import * as GlassWarehousSelectors from '@TanglassStore/inventory/lib/selectors/warehouseGlass.selectors';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { GlassInStockPermissions } from '@TanglassUi/inventory/utils/permissions';
import { ROLES } from '@tanglass-erp/store/app';

@Component({
  selector: 'tanglass-erp-warehouse-glasse',
  templateUrl: './warehouse-glasse.component.html',
  styleUrls: ['./warehouse-glasse.component.scss'],
})
export class WarehouseGlasseComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.store.select(GlassWarehousSelectors.getAllGlassWarehouses);
  permissions: ErpPermissions;
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private authFacadeService: AuthFacadeService
  ) {
    this.setColumnDefs();
    this.authFacadeService.currentUser$.subscribe((data) => {
      this.permissions = GlassInStockPermissions.get(data.role as ROLES);
    });
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.store.dispatch(GlassWarehousActions.loadGlassWarehouses());
  }

  openDialog(action, data = {}) {}

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
      case Operations.update:
        this.openDialog(event.action, event.data);
        break;
      case Operations.delete:
        break;
      // ...
    }
  }

  setColumnDefs(): void {
    this.columnDefs = GlassWarehouseHeaders;
  }
}
