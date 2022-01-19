import { Component, Inject } from '@angular/core';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsertedCashBox } from '@tanglass-erp/core/cash-register';
import { regConfigCashBox } from '@TanglassUi/cash-register/utils/forms';

@Component({
  selector: 'ngx-dialog-cashbox',
  templateUrl: './dialog-cashbox.component.html',
  styleUrls: ['./dialog-cashbox.component.scss']
})
export class DialogCashboxComponent extends FormDialog {
  title = "Ajouter une caisse";
  constructor(
    public dialogRef: MatDialogRef<DialogCashboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InsertedCashBox,
  ) {
    super(dialogRef, data);
  }

  regConfig: FieldConfig[] = regConfigCashBox(this.data);

  buildForm(): void {
  }


  submit(value) {
    super.submit({
      ...this.data,
      ...value
    })
  }


}
