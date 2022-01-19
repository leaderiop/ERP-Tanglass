import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigContact } from '../../../utils/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import * as ProviderActions from '@TanglassStore/contact/lib/actions/provider.actions';

@Component({
  selector: 'ngx-pop-short-contact',
  templateUrl: './pop-short-contact.component.html',
  styleUrls: ['./pop-short-contact.component.scss'],
})
export class PopShortContactComponent extends FormDialog {

  regConfig: FieldConfig[] = [];
  title = "Ajouter un contact";

  constructor(
    public dialogRef: MatDialogRef<PopShortContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
  }

  ngOnInit() {
    this.store.dispatch(ProviderActions.loadProviders());
    this.store.dispatch(CustomerActions.loadCustomers());
    super.ngOnInit();
  }

  buildForm(): void {
    this.regConfig = regConfigContact(this.data);
  }
}
