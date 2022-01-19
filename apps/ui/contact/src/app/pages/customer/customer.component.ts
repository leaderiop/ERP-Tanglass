import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { ErpPermissions,GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { PopCustomerComponent } from './pop-customer/pop-customer.component';
import { CustomerHeaders } from '../../utils/grid-headers';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';

import { AuthFacadeService } from '@tanglass-erp/store/app';
import { ConstactsPermissions } from "@TanglassUi/contact/utils/permissions";

@Component({
  selector: 'tanglass-erp-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ = this.store.select(CustomerSelectors.getAllCustomers);
  permissions: ErpPermissions = ConstactsPermissions.get(
    this.authFacadeService.currentUser.role
  );
  constructor(public dialog: MatDialog, private store: Store<AppState>,
  private authFacadeService: AuthFacadeService)
  {
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopCustomerComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
          this.store.dispatch(CustomerActions.addCustomer({customer: result}));
        } else if (action === Operations.update) {
          const {contacts, ...obj} = result;
          obj['id'] = data['id'];
          this.store.dispatch(CustomerActions.updateCustomer({customer: obj}));
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
        this.store.dispatch(CustomerActions.removeCustomer({customerId: event.data[0].id}));
        break;
      // ...
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...CustomerHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }

}
