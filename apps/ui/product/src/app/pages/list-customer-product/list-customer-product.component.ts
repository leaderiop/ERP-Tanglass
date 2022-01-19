import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { PopCustomerProductComponent } from './pop-customer-product/pop-customer-product.component';
import { CustomerProductHeaders } from '../../utils/grid-headers';
import * as CustomerProductSelectors from '@TanglassStore/product/lib/selectors/customer-product.selectores';
import * as CustomerProductActions from '@TanglassStore/product/lib/actions/customer-product.actions';
import { Store } from '@ngrx/store';
import * as ProductsActions from '@TanglassStore/product/lib/actions/product.actions';


@Component({
  selector: 'ngx-list-customer-product',
  templateUrl: './list-customer-product.component.html',
  styleUrls: ['./list-customer-product.component.scss'],
})
export class ListCustomerProductComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  data$ = this.store.select(CustomerProductSelectors.getAllCustomerProducts);
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
    this.store.dispatch(CustomerProductActions.loadCustomerProducts());

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
        this.store.dispatch(ProductsActions.removeManyProducts({ codes: event.data.map((e) => e.product.code) }));
        break;
      // ...
    }
  }

  setColumnDefs() {
    this.columnDefs = [
      ...CustomerProductHeaders,
      //{ field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }


  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopCustomerProductComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
          this.store.dispatch(CustomerProductActions.addCustomerProduct({ customerProduct: result }));

        } else {} // Update
      }
    });
  }
}
