import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersFacade, DraftFacade, OrderDelivery } from '@tanglass-erp/store/sales';
import { OrderDeliveriesHeaders } from '@TanglassUi/sales//utils/grid-headers';
import { Column } from '@tanglass-erp/material';
import { map } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { ErpPermissions, GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';

@Component({
  selector: 'ngx-order-deliveries',
  templateUrl: './order-deliveries.component.html',
  styleUrls: ['./order-deliveries.component.scss'],
})
export class OrderDeliveriesComponent  implements GridView, OnInit{
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.loadedOrder$.pipe(map(order=>order?.deliveries));


  constructor(
    protected facade: OrdersFacade,
  ) {
    this.setColumnDefs();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }
  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.delete:
        this.facade.removeMany(event.data.map((e) => e.id))
        break;
    }
  }
  setColumnDefs(): void {
    this.columnDefs = [
      ...OrderDeliveriesHeaders,
    ];
  }
}
