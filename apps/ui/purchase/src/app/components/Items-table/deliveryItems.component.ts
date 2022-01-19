import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopDeliveryItemComponent } from '@TanglassUi/purchase/components/add-delivery/pop-delivery-item.component';
import { Column } from '@tanglass-erp/material';
import { SubstanceHeaders } from '@TanglassUi/purchase/utils/grid-header';
import { DeliveriesFacade } from '@tanglass-erp/store/purchase';

@Component({
  selector: 'ngx-delivery-items',
  templateUrl: './deliveryItems.component.html',
  styleUrls: ['./deliveryItems.component.scss'],
})
export class DeliveriItemsComponent implements AfterViewInit, OnDestroy {
  displayedColumns: Array<Column> = SubstanceHeaders;
  data;
  deliveries$ = this.purchaseFacade.selectedDeliveryItems$;
  @Input()isCardMode: boolean = false;
  constructor(
    public dialog: MatDialog,
    private purchaseFacade: DeliveriesFacade
  ) {}

  ngOnInit() {}
  ngAfterViewInit(): void {}
  openDialog() {
    const dialogRef = this.dialog.open(PopDeliveryItemComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: '',
    });
  }

  ngOnDestroy(): void {
    this.purchaseFacade.clearDeliveryItems();
  }
}
