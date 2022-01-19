import { Component, Inject } from '@angular/core';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { regConfigTransferItem } from '@TanglassUi/inventory/utils/forms';

@Component({
  selector: 'ngx-pop-transfer-item',
  templateUrl: './pop-transfer-item.component.html',
  styleUrls: ['./pop-transfer-item.component.scss']
})
export class PopTransferItemComponent extends FormDialog {

  title = "Mise à jour";

  constructor(
    public dialogRef: MatDialogRef<PopTransferItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
  }

  regConfig: FieldConfig[];

  buildForm(): void {
    this.regConfig = regConfigTransferItem(this.data, 100);
  }


}
