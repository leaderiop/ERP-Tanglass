import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DynamicFormComponent,
  FieldConfig,
  FormDialog,
} from '@tanglass-erp/material';
import {
  regConfigTransferOrder,
  regConfigTransferOrderEdit,
  regConfigTransferOrderItem,
} from '@TanglassUi/inventory/utils/forms';
import { map, takeUntil } from 'rxjs/operators';
import { FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { of } from 'rxjs';
@Component({
  selector: 'ngx-pop-sale-points',
  templateUrl: './pop-warehouse-transfert.component.html',
  styleUrls: ['./pop-warehouse-transfert.component.scss'],
})
export class PopWarehouseTransfertComponent
  extends FormDialog
  implements AfterViewInit {
  title = 'Commande de Transfert';
  regConfig: FieldConfig[];
  formArray = new FormArray([]);
  orderForms = [];
  glasses$ = this.facade.allWarehouseGlass$.pipe(
    map((elem) =>
      elem.map((val) => ({ key: val.substanceid, value: val.label }))
    )
  );

  accessories$ = this.facade.allWarehouseAccessory$.pipe(
    map((elem) =>
      elem.map((val) => ({ key: val.substanceid, value: val.label }))
    )
  );
  substances = {};

  localWarehouses$;
  distributionWarehouses$;
  warehouses: Array<any>;

  @ViewChild('transfert_form', { read: DynamicFormComponent })
  transfertFormComponent: DynamicFormComponent;
  @ViewChildren('orderItem') dynamicForms: QueryList<DynamicFormComponent>;

  get transfertForm() {
    return this.transfertFormComponent?.form;
  }

  constructor(
    public dialogRef: MatDialogRef<PopWarehouseTransfertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private facade: SharedFacade,
    private cdr: ChangeDetectorRef,
    private authFacadeService: AuthFacadeService,
    private sharedFacade: SharedFacade
  ) {
    super(dialogRef, data);
  }

  ngOnInit() {
    this.authFacadeService.currentUser$.subscribe((user) => {
      this.localWarehouses$ = user.SalesPoint.warehouses.map((val) => ({
        key: val.id,
        value: val.name,
      }));
    });
    this.distributionWarehouses$ = this.sharedFacade
      .getPricipaleWarehouses()
      .pipe(
        map((warehouses) =>
          warehouses?.map((val) => ({
            key: val.id,
            value: val.name,
          }))
        )
      );

    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    ['fromWarehouseid', 'toWarehouseid'].forEach((item) => {
      this.transfertForm.get(item).valueChanges.subscribe((value) => {
        //this.syncWarehouses(item, value);
        if (item === 'fromWarehouseid') this.loadItems(value);
      });
    });
    this.dynamicForms.changes.subscribe(() => {
      this.assignOrderItemForms();
    });
    this.newOrderItem();
  }

  loadItems(warehouseid) {
    this.facade.loadAllWarehouseAccessories(warehouseid);
    this.facade.loadAllWarehouseGlasses(warehouseid);
    this.substances['Accessoire'] = this.accessories$;
    this.substances['Verre'] = this.glasses$;
  }

  buildForm(): void {
    this.regConfig = regConfigTransferOrder(this.data);
    this.regConfig = this.data?.id
      ? regConfigTransferOrderEdit(
          this.data,
          this.localWarehouses$,
          this.distributionWarehouses$
        )
      : regConfigTransferOrder(
          this.data,
          this.localWarehouses$,
          this.distributionWarehouses$
        );
  }

  assignOrderItemForms() {
    const forms = this.dynamicForms.map((item) => {
      item
        .getField('typeSubstance')
        .valueChanges.subscribe((value) => this.syncSubstances(item, value));
      return item.form;
    });
    while (this.formArray.length) {
      this.formArray.removeAt(0);
    }
    forms.forEach((form) => this.formArray.push(form));
  }

  syncSubstances(component: DynamicFormComponent, typeSubstance: string) {
    component.remakeField('substance', {
      options: this.substances[typeSubstance],
    });
  }

  syncWarehouses(inputName, value) {
    // const selectInput = this.regConfig.find(
    //   (elem) => elem.name === 'fromWarehouseid'
    // );
    // const selectInput2 = this.regConfig.find(
    //   (elem) => elem.name === 'toWarehouseid'
    // );
    // this.warehouses$.pipe(takeUntil(this._onDestroy)).subscribe((warhouses) => {
    //   if (inputName === 'fromWarehouseid')
    //     selectInput2.options = warhouses.filter((item) => item.key !== value);
    //   else selectInput.options = warhouses.filter((item) => item.key !== value);
    // });
  }

  newOrderItem() {
    this.orderForms.push(
      Object.assign([], regConfigTransferOrderItem({}, this.glasses$))
    );
  }

  submitAll() {
    const formValue = this.transfertForm.value;
    formValue.order_items = this.formArray.value;
    this.submit(formValue);
  }

  deleteOrderItem(fields) {
    this.orderForms = this.orderForms.filter((item) => item !== fields);
  }
}
