import { Component, Inject } from '@angular/core';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { regConfigServiceConfigUpdate } from '@TanglassUi/product/utils/forms';

@Component({
  selector: 'ngx-pop-service-config-update',
  templateUrl: './pop-service-config-update.component.html',
  styleUrls: ['./pop-service-config-update.component.scss']
})
export class PopServiceConfigUpdateComponent extends FormDialog {
  regConfig: FieldConfig[];
  title = "Modifier un service";

  constructor(
    public dialogRef: MatDialogRef<PopServiceConfigUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
  }

  buildForm(): void {
    this.regConfig = regConfigServiceConfigUpdate(this.data);
  }

}
