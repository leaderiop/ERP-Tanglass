import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErpPermissions, GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { DraftHeaders } from '@TanglassUi/sales/utils/grid-headers';
import { Router } from '@angular/router';
import { DraftFacade } from '@tanglass-erp/store/sales';

@Component({
  selector: 'ngx-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.facade.allDraft$;
  permissions: ErpPermissions = {
    add: false,
    delete: true
  }

  constructor(
    public dialog: MatDialog,
    private facade: DraftFacade,
  ) {
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.facade.loadAll();
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
      ...DraftHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn" }
    ];
  }

}
