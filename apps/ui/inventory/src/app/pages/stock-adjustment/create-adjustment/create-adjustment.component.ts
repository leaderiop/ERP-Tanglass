import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as productStore from '@TanglassStore/product/index';
import { Store } from '@ngrx/store';
import { Substance_Enum } from '@TanglassUi/inventory/utils/enums';
import { map, startWith } from 'rxjs/operators';
import {
  StockAdjustmentsFacade,
  WarehousesFacade,
} from '@tanglass-erp/store/inventory';
import { FormFields } from './formFields';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-create-adjustment',
  templateUrl: './create-adjustment.component.html',
  styleUrls: ['./create-adjustment.component.scss'],
})
export class CreateAdjustmentComponent extends FormFields {
  glasses$ = this.store.select(productStore.getAllGlasses);
  accessories$ = this.store.select(productStore.getAllAccessories);
  consumables$ = this.store.select(productStore.getAllConsumables);
  quantities$;

  constructor(
    public formBuilder: FormBuilder,
    private facade: WarehousesFacade,
    private stockFacade: StockAdjustmentsFacade,
    private store: Store,
    private authFacadeService: AuthFacadeService
  ) {
    super(formBuilder);
  }
  ngOnInit(): void {
    this.authFacadeService.currentUser$.subscribe(
      (user) => (this.warehouses$ = user.SalesPoint.warehouses)
    );
    this.loaData();
    this.createForm();
  }
  loaData() {
    this.store.dispatch(productStore.loadGlasses());
    this.store.dispatch(productStore.loadAccessories());
    this.store.dispatch(productStore.loadConsumables());
  }

  ngAfterViewInit(): void {
    this.formGroup?.get('type')?.valueChanges?.subscribe((val) => {
      switch (val) {
        case Substance_Enum.Verre: {
          this.glasses$
            .subscribe((data) => (this.products$ = data))
            .unsubscribe();
          break;
        }
        case Substance_Enum.Accessoire: {
          this.accessories$
            .subscribe((data) => (this.products$ = data))
            .unsubscribe();
          break;
        }
        case Substance_Enum.Consommable: {
          this.consumables$
            .subscribe((data) => (this.products$ = data))
            .unsubscribe();
          break;
        }
        default: {
          break;
        }
      }
      this.filteredProducts = this.formGroup?.get('code')?.valueChanges.pipe(
        startWith(''),
        map((value) => this._productFilter(value))
      );
    });
  }
  onWarehouseSelected(event) {
    const found = this.warehouses$?.find(
      (element) => element.name == event.option.value
    );
    this.warehouseid = found?.id;
    this.formGroup.controls['companyName'].setValue(found?.company?.name);
    this.stockFacade
      .getQuantityInHand(this.substanceid, this.warehouseid)
      .subscribe((data) =>
        this.formGroup.controls['oldQuantity'].setValue(data?.quantity ?? 0)
      );
  }
  onSubmit() {
    let result = {
      ...this.formGroup.value,
      oldQuantity: this.formGroup.controls['oldQuantity'].value,
      warehouse_id: this.warehouseid,
      substance_id: this.substanceid,
    };
    this.stockFacade.addStockAdjustment(result);
  }
}
