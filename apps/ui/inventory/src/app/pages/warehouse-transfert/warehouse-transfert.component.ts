import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ErpPermissions,
  GridView,
  MainGridComponent,
  Operations,
} from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { PopWarehouseTransfertComponent } from '@TanglassUi/inventory/pages/warehouse-transfert/pop-warehouse-transfert/pop-warehouse-transfert.component';
import {
  ordersDetailsHeaders,
  warehouseTransferHeaders,
} from '../../utils/grid-headers';
import { TransferOrderFacade } from '@tanglass-erp/store/inventory';
import { RequireExactlyOne } from '@tanglass-erp/core/common';
import { InsertedTransferOrder } from '@tanglass-erp/core/inventory';
import { TransfertPermissions } from '@TanglassUi/inventory/utils/permissions';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { ROLES } from '@tanglass-erp/store/app';

@Component({
  selector: 'tanglass-erp-warehouses',
  templateUrl: './warehouse-transfert.component.html',
  styleUrls: ['./warehouse-transfert.component.scss'],
})
export class WarehouseTransfertComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.transferOrders$;
  permissions: ErpPermissions;

  constructor(
    public dialog: MatDialog,
    private facade: TransferOrderFacade,
    private authFacadeService: AuthFacadeService
  ) {
    this.setColumnDefs();
    this.authFacadeService.currentUser$.subscribe((data) => {
      this.permissions = TransfertPermissions.get(data.role as ROLES);
    });
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.facade.loadAll();
  }

  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopWarehouseTransfertComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
          this.facade.insertOne({
            fromWarehouseid: result.fromWarehouseid,
            toWarehouseid: result.toWarehouseid,
            date: result.date,
            deadline: result.deadline,
            substances: result.order_items.map((elt) => ({
              substanceid: elt.substance,
              quantity: +elt.quantity,
            })),
          });
        } else {
          result['id'] = data['id'];
          this.facade.updateOne(
            result as RequireExactlyOne<InsertedTransferOrder, 'id'>
          );
        }
      }
    });
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
      case Operations.update:
        this.openDialog(event.action, event.data);
        break;
      case Operations.delete:
        this.facade.deleteMany(event.data.map((e) => e.id));
        break;
      case Operations.loadDetails:
        this.columnDefs = ordersDetailsHeaders;
        this.facade.loadAll(true);
        break;
      // ...
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...warehouseTransferHeaders,
      { field: 'id', headerName: 'Action', type: 'editColumn' },
    ];
  }
}
