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
import { AccessoryWarehouseHeaders } from '@TanglassUi/inventory/utils/grid-headers';
import * as AccessoryWarehousActions from '@TanglassStore/inventory/lib/actions/wareHouseAccessory.actions';
import * as AccessoryWarehousSelectors from '@TanglassStore/inventory/lib/selectors/warehouseAccessory.selectors';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { AccessoryInStockPermissions } from '@TanglassUi/inventory/utils/permissions';
import { ROLES } from '@tanglass-erp/store/app';

@Component({
  selector: 'tanglass-erp-warehouse-accessory',
  templateUrl: './warehouse-accessory.component.html',
  styleUrls: ['./warehouse-accessory.component.scss'],
})
export class WarehouseAccessoryComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.store.select(
    AccessoryWarehousSelectors.getAllAccessoryWarehouses
  );
  permissions: ErpPermissions;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private authFacadeService: AuthFacadeService
  ) {
    this.setColumnDefs();
    this.authFacadeService.currentUser$.subscribe((data) => {
      this.permissions = AccessoryInStockPermissions.get(data.role as ROLES);
    });
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.store.dispatch(AccessoryWarehousActions.loadWareHouseAccessories());
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
    this.columnDefs = AccessoryWarehouseHeaders;
  }
}
