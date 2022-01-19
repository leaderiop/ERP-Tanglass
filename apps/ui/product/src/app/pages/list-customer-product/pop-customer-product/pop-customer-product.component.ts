import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigCustomerProduct } from '../../../utils/forms';

@Component({
  selector: 'ngx-pop-customer-product',
  templateUrl: './pop-customer-product.component.html',
  styleUrls: ['./pop-customer-product.component.scss'],
})
export class PopCustomerProductComponent extends FormDialog {
  title = "Ajouter Article Client ";
  regConfig: FieldConfig[];


  constructor(
    public dialogRef: MatDialogRef<PopCustomerProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    this.regConfig = regConfigCustomerProduct(this.data, );
  }
}
