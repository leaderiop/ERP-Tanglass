import { Component, ViewChild } from '@angular/core';
import {
  ErpPermissions,
  GridView,
  MainGridComponent,
  Operations,
} from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { PurchaseHeaders } from '../../utils/grid-header';
import { DeliveriesFacade } from '@tanglass-erp/store/purchase';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { PurchasePermissions } from '@TanglassUi/purchase/utils/permissions';
import { ROLES } from '@tanglass-erp/store/app';

@Component({
  selector: 'tanglass-erp-delivery',
  templateUrl: './purchase-delivery.component.html',
  styleUrls: [],
})
export class PurchaseDeliveryComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.allDeliveries$;
  permissions: ErpPermissions;
  constructor(
    private router: Router,
    private facade: DeliveriesFacade,
    private authFacadeService: AuthFacadeService
  ) {
    this.setColumnDefs();
    this.authFacadeService.currentUser$.subscribe((data) => {
      this.permissions = PurchasePermissions.get(data.role as ROLES);
    });
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.facade.loadDeliveries();
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
        this.router.navigateByUrl('purchase/reception/addDelivery');
        break;
      case Operations.update:
        break;
      case Operations.delete:
        this.facade.removeMany(event.data.map((e) => e.id));
        break;
      // ...
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...PurchaseHeaders,
      { field: 'id', headerName: 'Action', type: 'editColumn' },
    ];
  }
}
