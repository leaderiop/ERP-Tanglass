import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as productStore from '@TanglassStore/product/index';
import { AbstractProductSale } from '../abstractProductSale';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDraftFacade, DraftFacade } from '@tanglass-erp/store/sales';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-service-sale',
  templateUrl: './service-sale.component.html',
  styleUrls: ['./service-sale.component.scss'],
})
export class ServiceSaleComponent
  extends AbstractProductSale<ServiceSaleComponent>
  implements OnInit {
  types: string[] = [
    this.product_types.Service,
    this.product_types.Consommable,
  ];
  quantityOptions: Observable<number[]> = this.facade.dimensions$.pipe(
    map((dimensions) => [dimensions.selectedM2, dimensions.selectedML])
  );
  constructor(
    public dialogRef: MatDialogRef<ServiceSaleComponent>,
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
  }
  configureFormAsPerType(): void {
    this.form.get('type')?.valueChanges?.subscribe((type) => {
      type == this.product_types.Service
        ? (this.store
            .select(productStore.getAllServices)
            .subscribe((data) => (this.products$ = data)),
          this.form.controls['warehouse'].setValidators([]),
          this.sharedfacade
            .getWarehousesAsPerUserRole(this.currentUser)
            .subscribe((warehouses) => (this.warehouses$ = warehouses)),
          this.clearCode())
        : (this.store
            .select(productStore.getAllConsumables)
            .subscribe((data) => (this.products$ = data)),
          this.form.controls['warehouse'].setValidators([Validators.required]),
          this.sharedfacade
            .getWarehousesAsPerUserRole(this.currentUser)
            .subscribe((warehouses) => (this.warehouses$ = warehouses)),
          this.clearCode());
    });
    this.form.controls['type'].setValue(this.product_types.Service);
  }
  displayFnQuantity(quantity): number {
    return quantity ?? 0;
  }
  sendItem(): void {
    let { product, warehouse, ...service } = this.form.value;
    this.facade.addManyServices({
      ...service,
      product_code: product?.product?.code,
      substance_id: product?.substanceid ?? null,
      company_id: this.company_id,
      warehouse_id: this.warehouse_id,
      company_name: product?.product?.companies
        ? product?.product.companies[0]?.name
        : null,
      labelFactory: product?.serviceConfig?.labelFactory,
      draft_id: this.draft_id,
      glasses: this.data?.SelectedGlasses,
    });
    this.close();
  }
  ngOndestroy(): void {}
}
