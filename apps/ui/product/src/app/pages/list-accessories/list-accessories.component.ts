import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { PopAccessoriesComponent } from './pop-accessories/pop-accessories.component';
import { AccessoryHeaders } from '../../utils/grid-headers';
import { AccessoryFacadeService } from '@TanglassStore/product/lib/+state/accessory.facade.service';


@Component({
  selector: 'ngx-list-consumable',
  templateUrl: './list-accessories.component.html',
  styleUrls: ['./list-accessories.component.scss'],
})
export class ListAccessoriesComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  data$ = this.facade.allAccessories$;
  agGrid: AgGridAngular;
  columnId = 'id';
  columnDefs;

  constructor(
    private dialog: MatDialog,
    private facade: AccessoryFacadeService
  ) {
    this.setColumnDefs();
  }

  ngOnInit(): void {
    this.facade.loadAll();
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
        this.facade.removeMany(event.data.map((e) => e.product.code));
        break;
      // ...
    }
  }

  setColumnDefs() {
    this.columnDefs = [
      ...AccessoryHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn" },
    ];
  }



  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopAccessoriesComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
          this.facade.insertOne(result);
        } else {
          result.accessory['id'] = data['id'];
          result.product['code'] = data['product']['code'];
          this.facade.updateOne(result);
        }
      }
    });
  }
}
