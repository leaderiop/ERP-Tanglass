import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent, FieldConfig, PageForm } from '@tanglass-erp/material';
import { deliveryFormType, regConfigDelivery } from '@TanglassUi/sales/utils/forms';
import { DeliveryFacade, DraftFacade, Order, OrdersFacade } from '@tanglass-erp/store/sales';
import * as ShortCompanieActions from '@TanglassStore/shared/lib/+state/company/short-company.actions';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import * as ShortCompanieSelectors from '@TanglassStore/shared/lib/+state/company/short-company.selectors';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DeliveryLineComponent } from '@TanglassUi/sales/components/delivery-line/delivery-line.component';
import { InsertedDeliveryForm } from '@tanglass-erp/core/sales';
import { cloneDeep } from 'lodash';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { DeliveryPermissions } from '@TanglassUi/sales/utils/permissions';
import { rolesDirection } from '@tanglass-erp/core/management';

@Component({
  selector: 'ngx-delivery-add',
  templateUrl: './delivery-add.component.html',
  styleUrls: ['./delivery-add.component.scss']
})
export class DeliveryAddComponent
  extends PageForm
  implements AfterViewInit {
  permissions 
  @ViewChild('table', { read: DeliveryLineComponent }) table;
  @ViewChild('form', { read: DynamicFormComponent, static: false }) form;
  DeliveryPermissions = DeliveryPermissions;
  regConfig: FieldConfig[];

  // Selectors
  companies$ = this.store.select(ShortCompanieSelectors.getAllShortCompany);
  customers$ = this.store.select(CustomerSelectors.getAllCustomers);
  contacts$ = this.store.select(ContactSelectors.getAllContacts);
  orders$ = this.ordersFacade.allOrders$.pipe(
    map(
      e => e.filter(item => item.delivery_status !== 'livré')
    )
  );
  selectedOrder$ = this.ordersFacade.selectedOrder$;
  selectedOrder: Order;
  orderLines$ = this.draftFacade.draftLoadedById$.pipe(
    filter(val => !!val),
    map(val => val['product_drafts'].filter(e => !!e.price))
  );

  data: InsertedDeliveryForm = null;

  commandData = [];


  constructor(
    private store: Store,
    private deliveryFacade: DeliveryFacade,
    private draftFacade: DraftFacade,
    private ordersFacade: OrdersFacade,
    public activatedRoute: ActivatedRoute,
    private authFacadeService: AuthFacadeService) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.authFacadeService.currentUser$.subscribe(
      (user) =>
        (this.permissions = DeliveryPermissions.get(user?.role as rolesDirection))
    );
    super.ngOnInit();
    if (this.id) {
      this.deliveryFacade.loadDeliveryById(this.id);
      this.deliveryFacade.selectedDelivery$.subscribe(value => {
      this.data = <InsertedDeliveryForm> cloneDeep(value);
      this.buildForm()
      })
    } else this.buildForm();
  }

  ngAfterViewInit(): void {
    if (this.id)
      return
    const orderField = this.form.getField('order_id');
    const companyField = this.form.getField('company_id');
    const clientField = this.form.getField('client_id');
    this.selectedOrder$.subscribe(
      value => {
        this.selectedOrder = value;
        this.draftFacade.loadById(value.draft_id)
        this.setColumnsData();
        companyField.patchValue(value.company.id);
        clientField.patchValue(value.customer.id);
      });
    orderField.valueChanges.subscribe(value => {
      this.ordersFacade.selectOrder(value);
    });
  }

  setColumnsData() {
    this.commandData = [
      {
        label: 'Infos',
        isToolbar: false,
        cols: 2,
        icons: [],
        data: [
          { label: 'N° Commande', value: this.selectedOrder?.id },
          { label: 'Client', value: this.selectedOrder?.customer?.name },
          { label: 'Date de la commande', value: this.selectedOrder?.date, type: 'date' },
          { label: 'Montant HT', value: this.selectedOrder?.total_ht },
          { label: 'Taxes', value: this.selectedOrder?.total_tax },
          { label: 'Total TTC', value: this.selectedOrder?.total_ttc }
        ]
      }
    ];
  }

  dispatchActions() {
    this.ordersFacade.loadAllOrders({});
    this.store.dispatch(ShortCompanieActions.loadShortCompany());
    this.store.dispatch(CustomerActions.loadCustomers());
    this.store.dispatch(ContactActions.loadContacts());
  }

  buildForm() {
    this.regConfig = regConfigDelivery(
      this.data,
      this.orders$,
      this.customers$,
      this.companies$.pipe(map(e => e.map(company => ({ key: company.id, value: company.name })))),
      this.contacts$
    );
  }

  submit(value: deliveryFormType) {
    const delivery_lines = this.table.adaptValue()
    const deliveryToInsert: InsertedDeliveryForm = {
      ...value,
      delivery_lines,
      amount_ttc: 0,
      amount_tva: 0,
      amount_ht: 0,
    };
    if (this.id)
      this.deliveryFacade.updateDelivery({ // Update Case
        ...deliveryToInsert,
        id: this.id
      });
    else this.deliveryFacade.addDelivery(deliveryToInsert); // Insert Case
  }

  print() {
    this.deliveryFacade.printDelivery(this.data);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.ordersFacade.clearSelection();
    this.draftFacade.clearState();
  }


}
