import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigServiceConsumable } from '../../../utils/forms';

@Component({
  selector: 'ngx-pop-glass',
  templateUrl: './pop-service-consumable.component.html',
  styleUrls: ['./pop-service-consumable.component.scss'],
})
export class PopServiceConsumableComponent extends FormDialog {
  title = "Ajouter une service consommable";
  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<PopServiceConsumableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    this.regConfig = regConfigServiceConsumable(this.data);
  }
}
