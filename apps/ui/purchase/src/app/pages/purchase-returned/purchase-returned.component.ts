import { Component, ViewChild } from '@angular/core';
import { GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseHeaders } from '@TanglassUi/purchase/utils/grid-header';

@Component({
  selector: 'ngx-purchase-returned',
  templateUrl: './purchase-returned.component.html',
  styleUrls: ['./purchase-returned.component.scss']
})
export class PurchaseReturnedComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = of([]);
  constructor(public dialog: MatDialog) {
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
  }



  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
        break;
      case Operations.update:
        break;
      case Operations.delete:
        break;
      // ...
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...PurchaseHeaders,
      {field: 'id', headerName: 'Action', type: "editColumn"}
    ];
  }


}
