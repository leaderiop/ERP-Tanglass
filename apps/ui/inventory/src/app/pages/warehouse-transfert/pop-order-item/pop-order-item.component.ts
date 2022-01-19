import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigTransferOrderItemCard } from '@TanglassUi/inventory/utils/forms';

@Component({
  selector: 'ngx-pop-sale-points',
  templateUrl: './pop-order-item.component.html',
  styleUrls: ['./pop-order-item.component.scss'],
})
export class PopOrderItemComponent extends FormDialog {
  title = 'Article';
  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<PopOrderItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
  }

  buildForm(): void {
    this.regConfig = regConfigTransferOrderItemCard(this.data, 100);
  }
}
