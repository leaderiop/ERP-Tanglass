import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { Observable } from 'rxjs';
import {
  Sales_Product_Type_Enum,
  ProductDraftFacade,
  DraftFacade,
} from '@tanglass-erp/store/sales';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthFacadeService } from '@tanglass-erp/store/app';

export abstract class AbstractProductSale<T> {
  form: FormGroup;
  product_types = Sales_Product_Type_Enum;
  products$;
  filteredProducts;
  warehouses$;
  filteredWarehouses: Observable<any>;
  titleAlert: string = 'Ce Champ Est Obligatoire';
  priceMarginMsg: string = '';
  company_id: string;
  warehouse_id: string;
  errorMessage: string;
  draft_id: number;
  dialogRef: MatDialogRef<T>;
  currentUser;
  public quota:number;
  constructor(
    public formBuilder: FormBuilder,
    public store: Store,
    public sharedfacade: SharedFacade,
    public facade: ProductDraftFacade,
    public draftfacade: DraftFacade,
    public authFacadeService: AuthFacadeService
  ) {
    this.authFacadeService.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
  }
  initialization(): void {
    this.draftfacade.selectedDraftId$
      .subscribe((id) => (this.draft_id = id))
      .unsubscribe();

    this.filteredProducts = this.form?.get('product')?.valueChanges.pipe(
      startWith(''),
      map((value) =>
        typeof value === 'string' ? value : value?.product?.code
      ),
      map((code) =>
        code ? this._productFilter(code) : this.products$?.slice()
      )
    );
    this.filteredWarehouses = this.form?.get('warehouse')?.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.name)),
      map((warehouse) =>
        warehouse ? this._warehouseFilter(warehouse) : this.warehouses$?.slice()
      )
    );
  }
  createForm(): void {
    this.form = this.formBuilder.group({
      type: [null, Validators.required],
      product: [null, Validators.required],
      label: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: [null, Validators.required],
      warehouse: ['', Validators.required],
      price: [0, Validators.required],
    });
  }
  public _productFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.products$.filter((option) =>
      option?.product?.code?.toLowerCase().includes(filterValue)
    );
  }
  public _warehouseFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.warehouses$.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }
  displayFnProduct(product): string {
    return product && product?.product?.code ? product?.product?.code : '';
  }
  displayFnWarehouse(warehouse): string {
    return warehouse && warehouse?.name ? warehouse?.name : '';
  }
  onCodeSelected($event): void {
    let product = $event?.option?.value;
    this.form.controls['label'].setValue(product?.product?.label);
    this.form.controls['unit'].setValue(product?.product?.unit);
    this.form.controls['price'].setValue(product?.product?.price ?? 0);
    this.form.controls['price'].setValidators([
      Validators.min(product?.product?.priceMin),
      Validators.max(product?.product?.priceMax),
    ]);
    this.priceMarginMsg =
      'Prix doit être entre ' +
      product?.product?.priceMin +
      ' et ' +
      product?.product?.priceMax;
    this.company_id = product?.product?.companies
      ? product?.product?.companies[0]?.id
      : null;
    this.filteredWarehouses = this.filteredWarehouses?.pipe(
      map((data) =>
        data?.filter((warehouse) => warehouse?.companyid == this.company_id)
      )
    );
    this.quota=product.quota??1;
  }
  onWarehouseSelected($event): void {
    this.warehouse_id = $event?.option?.value?.id;
  }
  clearCode(): void {
    this.form.controls['product'].setValue('');
  }
  clearMessage(): void {
    this.errorMessage = '';
  }
  onSubmit(): void {
    this.form.valid
      ? this.sendItem()
      : (this.errorMessage = 'Merci de bien verifier tous les champs  ');
  }
  close(): void {
    this.dialogRef.close();
  }
  abstract sendItem(): void;
}
