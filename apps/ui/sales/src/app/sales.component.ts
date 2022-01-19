import { Component, OnInit } from '@angular/core';
import { SharedFacade } from '@tanglass-erp/store/shared';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import * as SalePointActions from '@TanglassStore/management/lib/actions/salePoint.actions';
import * as productStore from '@TanglassStore/product/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  constructor(private store: Store, private sharedfacade: SharedFacade) {}

  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
    this.store.dispatch(ContactActions.loadContacts());
    //this.store.dispatch(SalePointActions.loadSalePoints());
    this.store.dispatch(productStore.loadGlasses());
    this.store.dispatch(productStore.loadCustomerProducts());
    this.store.dispatch(productStore.loadAccessories());
    this.store.dispatch(productStore.loadConsumables());
    this.store.dispatch(productStore.loadServices());
    this.sharedfacade.loadAllShortCompanies();
    this.sharedfacade.loadAllShortWarehouses();
    this.sharedfacade.loadAllShortSalePoint();
  }
}
