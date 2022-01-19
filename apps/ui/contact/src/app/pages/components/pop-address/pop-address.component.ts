import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigAddresses } from '../../../utils/forms';

@Component({
  selector: 'ngx-pop-contact',
  templateUrl: './pop-address.component.html',
  styleUrls: ['./pop-address.component.scss'],
})
export class PopAddressComponent extends FormDialog {

  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<PopAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef, data);
  }

  buildForm(): void {
    this.regConfig = regConfigAddresses(this.data);
  }
}
