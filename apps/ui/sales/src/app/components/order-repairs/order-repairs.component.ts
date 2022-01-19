import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {
  Product_draft,
  ProductDraftFacade,
  OrdersFacade,
  Sales_Product_Type_Enum,
} from '@tanglass-erp/store/sales';
import { JobOrdersFacade } from '@tanglass-erp/store/manufacturing';
import { Column } from '@tanglass-erp/material';
import { ProductColumns } from '@TanglassUi/sales/utils/grid-headers';
@Component({
  selector: 'ngx-order-repairs',
  templateUrl: './order-repairs.component.html',
  styleUrls: ['./order-repairs.component.scss'],
})
export class OrderRepairsComponent implements OnInit {
  public displayedColumns: Array<Column> = ProductColumns;
  public dataSource: Product_draft[] = [];
  private data$ = this.orderFacade.loadedOrder$;
  public glasses_ids;
  @ViewChild(MatTable, { static: true }) table: MatTable<Product_draft>;

  constructor(
    private facade: ProductDraftFacade,
    private JobOrdersFacade: JobOrdersFacade,
    private orderFacade: OrdersFacade
  ) {}

  ngOnInit(): void {
    this.facade.getProductsGroups().subscribe((data) => {
      this.dataSource = data.repeated;
      this.getGlassesIds();
    });
  }
  getGlassesIds() {
    let glasses = this.dataSource
      ?.filter(
        (data) =>
          (data?.type == Sales_Product_Type_Enum.Verre ||
            data?.type == Sales_Product_Type_Enum.ArticleClient) &&
          !data?.isLaunched
      )
      glasses.length?this.glasses_ids=glasses.map((data) => ({ id: data?.glass_draft?.id })):null;
  }
  launch() {
    let order_ref;
    this.data$.subscribe((data) => (order_ref = data.ref)).unsubscribe();
    this.JobOrdersFacade.addJobOrder({
      order_ref,
      ids: this.glasses_ids,
      isReparing: true,
    });
  }
}
