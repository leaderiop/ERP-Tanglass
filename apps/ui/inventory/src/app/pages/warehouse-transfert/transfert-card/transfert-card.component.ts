import { Component } from '@angular/core';
import { ModelCardComponent } from '@tanglass-erp/material';
import { DetailedTransferOrder, Transfered, TransferOrderFacade } from '@TanglassStore/inventory/index';
import { ActivatedRoute } from '@angular/router';
import { ErpPermissions, GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { orderItemsHeaders, TransferItemsHeaders } from '@TanglassUi/inventory/utils/grid-headers';
import { map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PopOrderItemComponent } from '@TanglassUi/inventory/pages/warehouse-transfert/pop-order-item/pop-order-item.component';
import { PopOrderItemDeliverComponent } from '@TanglassUi/inventory/pages/warehouse-transfert/pop-order-item-deliver/pop-order-item-deliver.component';
import { PopTransferItemComponent } from '@TanglassUi/inventory/pages/warehouse-transfert/pop-transfer-item/pop-transfer-item.component';

@Component({
  selector: 'ngx-warehouse-glasse-card',
  templateUrl: './transfert-card.component.html',
  styleUrls: ['./transfert-card.component.scss'],
})
export class TransfertCardComponent
  extends ModelCardComponent
  implements GridView {
  data$ = this.facade.selectedTransferOrder.pipe(takeUntil(this._onDestroy));
  order_items$;
  title = 'Transfert';
  gap = '50px';

  // Events
  deliverEvent = 'deliver';
  editNested = 'editNested';
  confirm = 'confirm';

  // Grid
  agGrid: AgGridAngular;
  columnDefs;
  detailColumnDefs;
  columnId = 'id';
  mainGrid: MainGridComponent;
  permissions: ErpPermissions = {
    deliver: true,
    editNested: true,
    confirm: true
  };
  detailColumnField = 'deliveries';
  constructor(
    private facade: TransferOrderFacade,
    public dialog: MatDialog,
    public route: ActivatedRoute
  ) {
    super(route);
    this.order_items$ = this.data$.pipe(map((e) => e?.order_items));
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {}

  afterComplete() {}

  dispatch(): void {
    this.facade.getOne(parseInt(this.id, 10));
  }

  passData(data?: DetailedTransferOrder) {
    return [
      {
        label: 'Infos Générales',
        isToolbar: 'true',
        cols: 3,
        icons: [{ name: 'edit', tooltip: 'Modification', event: 'editMain' }],
        data: [
          { label: 'De', value: data?.fromwarehouse?.name },
          { label: 'A', value: data?.towarehouse?.name },
          { label: 'Date', value: data?.date, type: 'date' },
          { label: 'Date limite', value: data?.deadline, type: 'date' },
          { label: 'État', value: [data?.status], type: 'chips' },
        ],
      },
      {
        label: 'Les Articles',
        isToolbar: 'true',
        cols: 3,
        data: [],
      },
    ];
  }

  openDialog(action, data = {}) {
    const component =
      action === Operations.update
        ? PopOrderItemComponent
        : action === this.editNested
        ? PopTransferItemComponent
        : PopOrderItemDeliverComponent;
    const dialogRef = this.dialog.open(component, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === Operations.update) {
          result['id'] = data['id'];
          this.facade.updateOrderItem(result);
        } else if (action === this.editNested) {
          result['id'] = data['id'];
          this.facade.updateItemTransfer({
            status: data['status'],
            confirmed: data['confirmed'],
            ...result,
          });
        } else {
          result['order_itemid'] = data['id'];
          this.facade.insertItemTransfer(result);
        }
      }
    });
  }

  eventTriggering(event) {
    switch (event.action) {
      case this.editNested:
      case Operations.update:
        this.openDialog(event.action, event.data);
        break;
      case this.deliverEvent:
        this.openDialog(event.action, event.data);
        break;
      case this.confirm:
        const {__typename, ...updatedData} = event.data;
        this.facade.updateItemTransfer({
          ...updatedData,
          confirmed: true
        } as Transfered)
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...orderItemsHeaders,
      {
        field: 'id',
        headerName: 'Action',
        type: 'editColumn',
        cellRendererParams: (params) => ({
          extra: [
            { icon: 'delivery_dining', tooltip: 'délivrer', event: 'deliver' },
          ],
        }),
      },
    ];
    this.detailColumnDefs = TransferItemsHeaders;
  }
}
