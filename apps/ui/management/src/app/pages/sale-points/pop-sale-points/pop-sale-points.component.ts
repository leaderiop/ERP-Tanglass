import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigSalePoint } from '@TanglassUi/management/utils/forms';

@Component({
  selector: 'ngx-pop-sale-points',
  templateUrl: './pop-sale-points.component.html',
  styleUrls: ['./pop-sale-points.component.scss'],
})
export class PopSalePointsComponent extends FormDialog {
  title = 'Ajouter un Emplacement';

  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<PopSalePointsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef, data);
  }

  buildForm(): void {
    if (this.data?.id) {
      this.title = 'Editer un Emplacement';
    }
    this.regConfig = regConfigSalePoint(this.data);
  }
}
