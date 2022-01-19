import { AfterViewInit, OnInit } from '@angular/core';
import { MainGridComponent } from '../components/main-grid/main-grid.component';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ErpPermissions } from './erpPermissions';

export interface GridView extends AfterViewInit, OnInit {
  mainGrid: MainGridComponent;
  data$: Observable<any>;
  agGrid: AgGridAngular;
  columnId: string;
  columnDefs;
  permissions?: ErpPermissions;
  setColumnDefs(): void;
  eventTriggering(event);
  openDialog?(action, data);
}
