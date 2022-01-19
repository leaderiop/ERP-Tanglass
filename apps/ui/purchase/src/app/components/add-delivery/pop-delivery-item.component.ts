import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent, FieldConfig, FormDialog } from '@tanglass-erp/material';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';
import { regConfigDeliveryItem } from '@TanglassUi/purchase/utils/forms';
import { SubstancesFacade } from '@TanglassStore/product/lib/+state/substances.facade';
import { DeliveriesFacade } from '@tanglass-erp/store/purchase';

@Component({
  selector: 'ngx-pop-delivery-transfer',
  templateUrl: './pop-delivery-item.component.html',
  styleUrls: ['./pop-delivery-item.component.scss'],
})
export class PopDeliveryItemComponent
  extends FormDialog
  implements AfterViewInit{
  title = 'Nouveau';
  substances$ = this.substancesFacade.allSubstances$;
  selectedProduct
  @ViewChild('delivery_form', { read: DynamicFormComponent })
  deliveryFormComponent: DynamicFormComponent;
  get DeliveryItemForm() {
    return this.deliveryFormComponent?.form;
  }
  regConfig: FieldConfig[];
  warehouses$ = this.facade.allShortWarehouse$.pipe(
    map((elem) => elem.map((val) => ({ key: val.id, value: val.name })))
  );
  products;
  constructor(
    public dialogRef: MatDialogRef<PopDeliveryItemComponent>,
    private facade: SharedFacade,
    private deliveryFacade: DeliveriesFacade,
    private substancesFacade: SubstancesFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    this.substances$.subscribe((data) => (this.products = data)).unsubscribe();
    if (this.data?.id) {
      this.title = 'Éditer ';
    }
    this.regConfig = regConfigDeliveryItem(
      [],
      this.substances$.pipe(map(sub=>sub.map(substance=>({id:substance?.code,label:substance?.label})))),
      this.warehouses$
    );
  }

  ngAfterViewInit(): void {
    this.DeliveryItemForm.get('code')?.valueChanges?.subscribe((val) => {
      this.selectedProduct= this.products?.find((element) => element?.code == val);
      this.DeliveryItemForm.controls['label'].setValue(
        this.selectedProduct?.label || this.selectedProduct?.label
      );
      this.DeliveryItemForm.controls['unit']?.setValue(this.selectedProduct?.unit);
    });

  }
  submitForm() {
    this.deliveryFacade.addDeliveryItem({...this.DeliveryItemForm.value,
      substance_id:this.selectedProduct?.id});
    this.closePopup();
  }

}
