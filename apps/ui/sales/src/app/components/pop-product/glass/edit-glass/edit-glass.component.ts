import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as productStore from '@TanglassStore/product/index';
import { AbstractProductSale } from '../../abstractProductSale';
import { ProductDraftFacade, DraftFacade } from '@tanglass-erp/store/sales';
import { AuthFacadeService } from '@tanglass-erp/store/app';

@Component({
  selector: 'ngx-edit-glass',
  templateUrl: './edit-glass.component.html',
  styleUrls: ['./edit-glass.component.scss'],
})
export class EditGlassComponent
  extends AbstractProductSale<EditGlassComponent>
  implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditGlassComponent>,
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
  }
  ngOnInit(): void {
    this.createForm();
    this.configureFormAsPerType();
    this.initialization();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      label: [this.data?.item.label, Validators.required],
      heigth: [this.data?.item.heigth, Validators.required],
      width: [this.data?.item.width, Validators.required],
      price: [this.data?.item.price, Validators.required],
      count: [this.data?.item.count, Validators.required],
    });
  }

  configureFormAsPerType(): void {
    this.sharedfacade
    .getWarehousesAsPerUserRole(this.currentUser)
    .subscribe((warehouses) => (this.warehouses$ = warehouses))

  }

  sendItem(): void {
    let {
      consumable_draft,
      service_draft,
      __typename,
      ...oldGlass
    } = this.data?.item;
    this.facade.updateGlass({ ...this.form.value, oldGlass });
    this.close();
  }

  ngOndestroy(): void {}
}
