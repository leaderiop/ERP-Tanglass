import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { regConfigDeliveryInfos } from '@TanglassUi/purchase/utils/forms';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent, FieldConfig } from '@tanglass-erp/material';
import { DeliveriesFacade } from '@tanglass-erp/store/purchase';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import * as ProviderSelectors from '@TanglassStore/contact/lib/selectors/provider.selectors';

@Component({
  selector: 'ngx-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss'],
})
export class AddDeliveryComponent implements AfterViewInit {
  title = 'Réception Fournisseur';
  regConfig: FieldConfig[];
  data;

  @ViewChild('delivery_form', { read: DynamicFormComponent })
  deliveryFormComponent: DynamicFormComponent;
  get deliveryForm() {
    return this.deliveryFormComponent?.form;
  }
  providers$ = this.store.select(ProviderSelectors.getAllProviders)

  constructor(
    public dialog: MatDialog,
    private purchaseFacade: DeliveriesFacade,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.regConfig = regConfigDeliveryInfos(
      this.data,
      this.providers$,
    );
  }
  ngAfterViewInit(): void {
    this.regConfig = regConfigDeliveryInfos(this.data, this.providers$);
  }

  save() {
    this.purchaseFacade.addDelivery(this.deliveryForm.value);
  }
  cancel() {}

}
