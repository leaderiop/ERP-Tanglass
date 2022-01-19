import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';

import * as CompanieActions from '@TanglassStore/management/lib/actions/companies.actions';
import * as CompanieSelectors from '@TanglassStore/management/lib/selectors/companies.selectors';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';

import { ErpPermissions,GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { PopCompaniesComponent } from './pop-companies/pop-companies.component';
import { CompanieHeaders } from '@TanglassUi/management/utils/grid-headers';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { ManagamentPermissions } from '@TanglassUi/management/utils/permissions';
@Component({
  selector: 'tanglass-erp-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements GridView {

  agGrid: AgGridAngular;
  columnDefs;
  columnId = 'id';
  data$ = this.store.select(CompanieSelectors.getAllCompanies);
  @ViewChild(MainGridComponent) mainGrid;
  permissions: ErpPermissions = ManagamentPermissions.get(
    this.authFacadeService.currentUser.role
  );
  constructor(
    public dialog: MatDialog,
    private authFacadeService:AuthFacadeService,
    private store: Store<AppState> ) {
    this.setColumnDefs();

  }

  ngOnInit(): void {
    this.store.dispatch(CompanieActions.loadCompanies());
  }

  ngAfterViewInit() {
    this.agGrid = this.mainGrid.agGrid;
  }

  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopCompaniesComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === Operations.add) {
          this.store.dispatch(CompanieActions.addCompanie({ companie: result }));
        } else if ( action === Operations.update) {
          result['id'] = data['id'];
          this.store.dispatch(CompanieActions.updateCompanie({ companie: result }));
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
        this.store.dispatch(CompanieActions.removeCompanie({ companieId: event.data[0].id }));
        break;
      // ...
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...CompanieHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }

}
