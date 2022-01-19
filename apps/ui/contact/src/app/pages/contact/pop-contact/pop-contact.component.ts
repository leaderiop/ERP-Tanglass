import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialog, Groupfield } from '@tanglass-erp/material';
import { regConfigContactDetailed } from '../../../utils/forms';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { combineLatest } from 'rxjs';
import * as ProviderSelectors from '@TanglassStore/contact/lib/selectors/provider.selectors';
import { map, take } from 'rxjs/operators';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import * as ProviderActions from '@TanglassStore/contact/lib/actions/provider.actions';


@Component({
  selector: 'ngx-pop-contact',
  templateUrl: './pop-contact.component.html',
  styleUrls: ['./pop-contact.component.scss'],
})
export class PopContactComponent extends FormDialog {

  regConfig: Groupfield[] = [];
  title = "Ajouter un contact";

  constructor(
    public dialogRef: MatDialogRef<PopContactComponent>,
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
    const source = combineLatest([
        this.store.select(ProviderSelectors.getAllProviders),
        this.store.select(CustomerSelectors.getAllCustomers)      ]
      );
    source.pipe(
      map(res => ({providers: res[0],customers: res[1] })),
      take(4)
    ).subscribe(value => {
      this.regConfig = regConfigContactDetailed(
        this.data,
        value.customers.map(elem => ({key: elem.id, value: elem.name})),
        value.providers.map(elem => ({key: elem.id, value: elem.name})));
     }
    );
  }
}
