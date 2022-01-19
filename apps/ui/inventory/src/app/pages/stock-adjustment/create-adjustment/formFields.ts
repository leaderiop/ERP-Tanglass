import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Substance_Enum } from '@TanglassUi/inventory/utils/enums';
import { map, startWith } from 'rxjs/operators';
import { Stock_Adjustment_Reasons_Enum } from '@tanglass-erp/store/inventory';

export class FormFields {
  formGroup: FormGroup;
  titleAlert: string = 'Ce Champ Est Obligatoire';
  glasses$;
  accessories$;
  consumables$;
  products$ = [];
  filteredProducts: Observable<string[]> = of(['']);
  filteredWarehouses: Observable<string[]>;
  warehouses$ = [];
  substanceid: string;
  warehouseid: string;
  types = Object.values(Substance_Enum);
  reasons = Object.values(Stock_Adjustment_Reasons_Enum);
  constructor(public formBuilder: FormBuilder) {}

  createForm() {
    this.formGroup = this.formBuilder.group({
      type: ['', Validators.required],
      code: ['', Validators.required],
      label: [{ value: '', disabled: true }, Validators.required],
      unit: [{ value: '', disabled: true }, Validators.required],
      warehouseName: ['', Validators.required],
      companyName: [{ value: '', disabled: true }, Validators.required],
      oldQuantity: [{ value: null, disabled: true }, Validators.required],
      newQuantity: [null, Validators.required],
      reason: ['', Validators.required],
      note: [''],
    });
  }

  public _productFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.products$.filter((option) => {
      return option?.product?.code?.toLowerCase().includes(filterValue);
    });
  }
  public _warehouseFilter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.warehouses$?.filter((option) => {
      return option?.name?.toLowerCase().includes(filterValue);
    });
  }
  onCodeSelected(event) {
    const found = this.products$?.find(
      (element) =>
        element.product?.code == event.option.value ||
        element?.code == event.option.value
    );
    this.formGroup.controls['label'].setValue(found?.product?.label);
    this.formGroup.controls['unit'].setValue(found?.product?.unit);
    this.filteredWarehouses = this.formGroup
      ?.get('warehouseName')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._warehouseFilter(value))
      );
    this.substanceid = found.substanceid;
  }
}
