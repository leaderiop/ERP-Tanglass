import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as productStore from '@TanglassStore/product/index';
import { AbstractProductSale } from '../abstractProductSale';
import { ProductDraftFacade, DraftFacade } from '@tanglass-erp/store/sales';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-accessory-sale',
  templateUrl: './accessory-sale.component.html',
  styleUrls: ['./accessory-sale.component.scss'],
})
export class AccessorySaleComponent
  extends AbstractProductSale<AccessorySaleComponent>
  implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AccessorySaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public formBuilder: FormBuilder,
    public store: Store,
    public sharedfacade: SharedFacade,
    public facade: ProductDraftFacade,
    public draftfacade: DraftFacade,
    public authFacadeService: AuthFacadeService

  ) {
    super(formBuilder, store, sharedfacade, facade, draftfacade,authFacadeService);
    this.dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.createForm();
    this.configureFormAsPerType();
    this.initialization();
  }
  configureFormAsPerType(): void {
    this.store
      .select(productStore.getAllAccessories)
      .subscribe((data) => (this.products$ = data));
    this.form.controls['type'].setValue(this.product_types.Accessoire);
    this.sharedfacade
            .getWarehousesAsPerUserRole(this.currentUser)
            .subscribe((warehouses) => (this.warehouses$ = warehouses))
         
  }

  sendItem(): void {
    let { product, warehouse, ...accessory } = this.form.value;
    this.facade.addAccessory({
      ...accessory,
      product_code: product?.product.code,
      substance_id: product?.substanceid,
      company_id: this.company_id,
      company_name: warehouse?.company?.name,
      warehouse_id: this.warehouse_id,
      draft_id: this.draft_id,
      quota:this.quota
    });
    this.close();
  }
  ngOndestroy(): void {}
}
