import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { PopSuppliesComponent } from './pop-supplies/pop-supplies.component';
import { SuppliesHeaders } from '../../utils/grid-headers';
import * as SupplySelectors from '@TanglassStore/product/lib/selectors/supply.selectors';
import * as SupplyActions from '@TanglassStore/product/lib/actions/supply.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'ngx-list-supplies',
  templateUrl: './list-supplies.component.html',
  styleUrls: ['./list-supplies.component.scss'],
})
export class ListSuppliesComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  data$ = this.store.select(SupplySelectors.getAllSupplies);
  agGrid: AgGridAngular;
  columnId = 'id';
  columnDefs;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {
    this.setColumnDefs();
  }

  ngOnInit(): void {
    // load data
    this.store.dispatch(SupplyActions.loadSupplies());

  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  setColumnDefs() {
    this.columnDefs = [
      ...SuppliesHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn" },
    ];
  }

  eventTriggering(event: any) {
    switch (event.action) {
      case Operations.add:
      case Operations.update:
        this.openDialog(event.action, event.data);
        break;
      case Operations.delete:
        break;
    }
  }

  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopSuppliesComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === Operations.add) {
          this.store.dispatch(SupplyActions.addSupply({ supply: result }));

        } else { } // Update
      }
    });
  }
}
