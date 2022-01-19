import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { PopConsumableComponent } from './pop-consumable/pop-consumable.component';
import { ConsumableHeaders } from '../../utils/grid-headers';
import { Consumable } from '@tanglass-erp/core/product';
import { ConsumableFacadeService } from '@TanglassStore/product/lib/+state/consumable.facade.service';

@Component({
  selector: 'ngx-list-consumable',
  templateUrl: './list-consumable.component.html',
  styleUrls: ['./list-consumable.component.scss'],
})
export class ListConsumableComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  data$: Observable<Consumable[]>=this.facade.allConsumables$;

  agGrid: AgGridAngular;
  columnId = 'id';
  columnDefs;

  constructor(
    private dialog: MatDialog,
    private facade: ConsumableFacadeService
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
      ...ConsumableHeaders,
      {field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }


  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopConsumableComponent, {
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
          result.consumable['id'] = data['id'];
          result.product['code'] = data['product']['code'];
          this.facade.updateOne(result);
        }
      }
    });
  }
}
