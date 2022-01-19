import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { MainGridComponent } from '@tanglass-erp/ag-grid';

@Component({
  selector: 'ngx-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(MainGridComponent) mainGrid;
  orders$: Observable<any>;
  agGrid: AgGridAngular;
  columnId = 'id';
  columnDefs;
  autoGroupColumnDef = {
    // headerName: 'Model',
    // field: 'model',
    // cellRenderer: 'agGroupCellRenderer',
    // cellRendererParams: {
    //   checkbox: true
    // }
  };
  constructor(public datepipe: DatePipe) {
    this.setColumnDefs();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  setColumnDefs() {
    this.columnDefs = [
      { field: 'id', headerName: 'N° B.T', type: "objectColumn",
        valueGetter: function(params) {
                  if (!params.data) return null;
                  const data = {
                              link: 'detail/',
                              linkText: 'B.T 00' + params.data.id + '/21',
                              toString: () => params.data.id.toString(),
                            };
                  return data;
                },
        },
      { field: 'attachements_id', headerName: 'N° B.C', type: "numberColumn",
          valueFormatter: (params) => (!params.value) ? null : ' B.C 00' + params.value + '/21'},
      { field: 'date', headerName: 'Date', type: "dateColumn"},
      { field: 'delay', headerName: 'Délai'},
      { field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }

  getOrders() {
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case 'add':
        break;
      case 'edit':
        break;
      // ...
    }
  }
}
