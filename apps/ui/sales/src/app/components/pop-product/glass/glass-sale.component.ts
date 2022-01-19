import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as productStore from '@TanglassStore/product/index';
import { AbstractProductSale } from '../abstractProductSale';
import { DimensionsComponent } from './product-dimensions/product-dimensions.component';
import { ProductDraftFacade, DraftFacade } from '@tanglass-erp/store/sales';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-glass-sale',
  templateUrl: './glass-sale.component.html',
  styleUrls: ['./glass-sale.component.scss'],
})
export class GlassSaleComponent
  extends AbstractProductSale<GlassSaleComponent>
  implements OnInit {
  types = [this.product_types.Verre, this.product_types.ArticleClient];
  @ViewChild('dimensions_form', { read: DimensionsComponent })
  dimensions_form: DimensionsComponent;
  constructor(
    public dialogRef: MatDialogRef<GlassSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public formBuilder: FormBuilder,
    public store: Store,
    public sharedfacade: SharedFacade,
    public facade: ProductDraftFacade,
    public draftfacade: DraftFacade,
    public authFacadeService: AuthFacadeService
  ) {
    super(
      formBuilder,
      store,
      sharedfacade,
      facade,
      draftfacade,
      authFacadeService
    );
    this.dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.createForm();
    this.configureFormAsPerType();
    this.initialization();
    this.patchValue();
  }
  patchValue(): void {
   // this.data ? console.log(this.data) : console.log('No Data');
  }
  configureFormAsPerType(): void {
    this.form.removeControl('quantity');
    this.form.get('type')?.valueChanges?.subscribe((type) => {
      type == this.product_types.ArticleClient
        ? (this.store
            .select(productStore.getAllCustomerProducts)
            .subscribe((data) => (this.products$ = data)),
          this.form.removeControl('warehouse'),
          this.clearCode())
        : (this.store
            .select(productStore.getAllGlasses)
            .subscribe((data) => (this.products$ = data)),
          this.sharedfacade
            .getWarehousesAsPerUserRole(this.currentUser)
            .subscribe((warehouses) => (this.warehouses$ = warehouses)),
          this.clearCode());
    });
    this.form.controls['type'].setValue(this.product_types.Verre);
  }
  onSubmit(): void {
    this.form.valid && this.dimensions_form?.dimensions?.valid
      ? this.sendItem()
      : (this.errorMessage = 'Verifier Votre Infos! ');
  }
  sendItem(): void {
    let { product, warehouse, ...glass } = this.form.value;
    this.facade.addGlass({
      ...glass,
      product_code: product.product.code,
      dimensions: this.dimensions_form?.dimensions?.value,
      substance_id: product?.substanceid,
      company_id: this.company_id,
      warehouse_id: this.warehouse_id,
      company_name: warehouse?.company?.name,
      draft_id: this.draft_id,
    });
    this.close();
  }
  ngOndestroy(): void {}
}
