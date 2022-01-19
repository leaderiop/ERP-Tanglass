import { Component, OnInit } from '@angular/core';
import { SharedFacade } from '@TanglassStore/shared/index';
import { SubstancesFacade } from '@TanglassStore/product/lib/+state/substances.facade';
import * as ProviderActions from '@TanglassStore/contact/lib/actions/provider.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';


@Component({
  selector: 'ngx-product',
  templateUrl: './purchase.component.html',
  styleUrls: []
})
export class PurchaseComponent implements OnInit {

  constructor(
    private facade: SharedFacade,
    private substancesFacade: SubstancesFacade,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.facade.loadAllShortWarehouses();
    this.substancesFacade.loadAllSubstances();
    this.store.dispatch(ProviderActions.loadProviders());
  }

}
