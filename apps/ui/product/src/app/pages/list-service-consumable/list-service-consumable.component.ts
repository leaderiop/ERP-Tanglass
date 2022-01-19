import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { PopServiceConsumableComponent } from './pop-service-glasse/pop-service-consumable.component';
import { ServiceConsumableHeaders } from '../../utils/grid-headers';


@Component({
  selector: 'ngx-list-consumable',
  templateUrl: './list-service-consumable.component.html',
  styleUrls: ['./list-service-consumable.component.scss'],
})
export class ListServiceConsumableComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  data$: Observable<any>;
  agGrid: AgGridAngular;
  columnId = 'id';
  columnDefs;

  constructor(
    private dialog: MatDialog,
  ) {
    this.setColumnDefs();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  eventTriggering(event: any) {
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

  setColumnDefs() {
    this.columnDefs = [
      ...ServiceConsumableHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }


  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopServiceConsumableComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
        } else {} // Update
      }
    });
  }
}
