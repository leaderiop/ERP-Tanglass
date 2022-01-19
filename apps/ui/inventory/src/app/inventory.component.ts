import { Component, OnInit } from '@angular/core';
import { StockAdjustmentsFacade, WarehousesFacade } from '@tanglass-erp/store/inventory';
import { SharedFacade } from '@tanglass-erp/store/shared';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  constructor(
    private facade: WarehousesFacade,
    private sharedFacade: SharedFacade,
    private stockFacade: StockAdjustmentsFacade
  ) {}
  ngOnInit(): void {
    // this.facade.loadAllWarehouses();
    this.stockFacade.loadStockInHands();
    this.sharedFacade.loadAllShortWarehouses();
    this.sharedFacade.loadAllShortSalePoint();
  }
}
