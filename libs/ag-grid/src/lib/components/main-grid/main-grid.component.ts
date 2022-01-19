import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ExportBottomSheetComponent } from '../export-bottom-sheet/export-bottom-sheet.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tanglass-erp/material';
import { Operations } from '../../enums/operations';
import { ErpPermissions } from '../../interfaces/erpPermissions';
import { GroupButton } from '../../interfaces/group-button';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { dateType } from '../../interfaces/date';

import { SIDEBAR, STATUSBAR } from '../../utils/aggrid-bars';
import { columnTypes } from '../../utils/aggrid-column-types';
import { PERMISSIONS } from '../../utils/aggrid-utils';
import { defaultColDef, gridOptions } from '../../utils/aggrid-options';

@Component({
  selector: 'ngx-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss'],
})
export class MainGridComponent {
  @ViewChild('agGrid') public agGrid: AgGridAngular;
  _rowData: Observable<any> | Array<any>;
  @Input() set rowData(obj) {
    if (obj instanceof Array) this._rowData = of(obj);
    else this._rowData = obj;
  }
  get rowData() {
    return this._rowData;
  }

  // *** Inputs ***
  @Input() columnDefs: Array<any>;
  @Input() detailColumnDefs: Array<any>;
  @Input() detailColumnField: string;
  @Input() masterDetail: boolean = false;
  @Input() autoGroupColumnDef: any;
  @Input() columnId = 'id';
  // Toolbar
  @Input() withToolbar: boolean = true;
  @Input() extraActions: Array<GroupButton> = [];
  @Input() withDetails: boolean = false;
  @Input() withCrud: boolean = true;
  @Input()
  set permissions(perms: ErpPermissions) {
    this._permissions = {
      add: true,
      update: true,
      delete: true,
      ...perms,
    };
  }

  get permissions() {
    return this._permissions;
  }

  @Input() enableCharts: boolean = true;
  @Input() theme = 'ag-theme-alpine';
  @Input() rowGroupPanelShow = 'always';
  @Input() height = '960px';
  @Input() width = '100%';
  @Input() withDateFilter: boolean = false;
  @Input() dateText;

  sideBar = SIDEBAR;
  statusBar = STATUSBAR;
  columnTypes = columnTypes(this.datepipe);
  _permissions = PERMISSIONS;
  gridOptions = gridOptions(this.columnId);
  defaultColDef = defaultColDef;
  operations = Operations;

  // *** Outputs ***
  @Output() triggerEvent = new EventEmitter<{ action: string; data?: any }>();

  private gridApi: any;
  private gridColumnApi: any;
  selectedData = new Array();
  context;
  hide = false; // For Search reset  button
  isRowMaster;

  constructor(
    public datepipe: DatePipe,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.context = {componentParent: this};
    this.isRowMaster = dataItem =>
      dataItem ? dataItem[this.detailColumnField].length > 0 : false;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.agGrid.gridOptions.onRowSelected = (event) => {
      this.selectedData = this.getSelectedRows();
    };

    this.agGrid.gridOptions.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: this.detailColumnDefs,
        defaultColDef: {
          sortable: true,
          flex: 1,
        },
        columnTypes: this.columnTypes,
        context: this.context
      },
      getDetailRowData: function (_params) {
        _params.successCallback(_params.data[this.detailColumnField]);
      }.bind(this),
    };
    const sortModel = [{ colId: this.columnId, sort: 'asc' }];
    this.gridColumnApi.applyColumnState({ state: sortModel });
    // this.gridApi.sizeColumnsToFit();
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('filterby')) {
        this.applyFilter(params.filterby, params.value);
      }
    });
  }

  applyFilter(key, value) {
    const instance = this.gridApi.getFilterInstance(key);
    instance.setModel({
      values: [value],
    });
    this.gridApi.onFilterChanged();
  }

  triggerAction(action: string, data?) {
    this.triggerEvent.emit({
      action,
      data,
    });
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => {
      return node.data;
    });
    // const selectedDataStringPresentation = selectedData.map(node => node.date + ' ' + node.id).join(', ');
    return selectedData;
  }

  search(value: string) {
    this.gridApi.setQuickFilter(value);
  }

  resetSearch() {
    this.hide = true;
    this.search('');
  }

  openBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(ExportBottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((value) => {
      if (value === 'excel') this.exportExcel();
      else if (value === 'csv') this.exportCsv();
    });
  }

  exportCsv() {
    this.gridApi.exportDataAsCsv();
  }

  exportExcel() {
    this.gridApi.exportDataAsExcel();
  }

  openFilterDateDialog(): void {
    const dialogRef = this.dialog.open(DateFilterComponent);

    dialogRef.afterClosed().subscribe((result: dateType) => {
      if (result) {
        this.dateText = result.dateText;
        this.triggerAction(this.operations.dateChange, {
          dateStart: result.dateStart,
          dateEnd: result.dateEnd,
        });
      }
    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.triggerAction(this.operations.delete, this.getSelectedRows());
    });
  }
}
