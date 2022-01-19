import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { MatDialog } from '@angular/material/dialog';
import { PopCustomerComponent } from '../pop-customer/pop-customer.component';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import { getSelectedCustomer } from '@TanglassStore/contact/lib/selectors/customer.selectors';
import { PopShortContactComponent } from '../../contact/pop-short-contact/pop-short-contact.component';
import { PopAddressComponent } from '../../components/pop-address/pop-address.component';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { DetailedCustomer } from '@TanglassStore/contact/index';


const componentMapper = {
  address: PopAddressComponent,
  contact: PopShortContactComponent,
  customer: PopCustomerComponent
};

@Component({
  selector: 'ngx-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerCardComponent extends ModelCardComponent {
  title = "Client";
  gap = "50px";
  showMessage = 'afficher';
  hideMessage = 'cacher';
  stepContact = null;
  stepAddress = null;
  data$ = this.store.select(getSelectedCustomer)
    .pipe(filter((e) => !!e), takeUntil(this._onDestroy));

  contactPassedData = (contact) => [

    {
      cols: 3,
      data:
        [
          {label: 'Assigné à', value: contact?.createdBy },
          {label: 'Note', value: contact?.note},
        ]
    },
  ]
  addressPassedData = (address) => [
    {
      cols: 3,
      data:
        [
          {label: 'Adresse', value: address?.address},
          {label: 'Ville', value: address?.city},
          {label: 'Code Postal', value: address?.zip},
        ]
    },
  ]

  constructor(
    private store: Store<AppState>,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
  ) {
    super(route);
  }

  dispatch(): void {
    this.store.dispatch(CustomerActions.loadCustomerById({id: this.id}));
  }

  afterComplete() {
    this.cdRef.detectChanges();
  }

  passData(data: DetailedCustomer) {
    return [
    {
      label: "Infos Générales",
      isToolbar:"true",
      cols:3,
      icons:[{name:"edit",tooltip:"Modification",event:'editMain'}],
      data:
        [
          {label: 'Nom', value: data?.name},
          {label: 'Code', value: data?.code},
          {label: 'ICE', value: data?.ICE},
          {label: 'IF', value: data?.IF},
          {label: 'E-mail', value: data?.mail, type: 'mail'},
          {label: 'Téléphone', value: data?.phone, type: 'phone'},
          {label: 'FAX', value: data?.FAX},
          {label: 'Site web', value: data?.website, type: 'link'},
          { label: 'createdAt', value: data?.createdAt },
          { label: 'createdBy', value: data?.createdBy },
          { label: 'updatedAt', value: data?.updatedAt },
          { label: 'updatedBy', value: data?.updatedBy },
          {label: 'Note', value: data?.note},

        ]
    },
    ];

  }

  async openDialog(model, data = {}) {
    const component = componentMapper[model];
    const dialogRef = this.dialog.open(component, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Store Add/Update action dispatching
        switch (model) {
          case 'address': // Add
            this.store.dispatch(CustomerActions.addAdressToCustomer({address: {
              id : this.id,
              address : result,
            }}))
            break;
          case 'contact': // Add
            this.store.dispatch(CustomerActions.addContactToCustomer({contact: {
              id : this.id,
              contact : result,
            }}))
            break;
          case 'customer': // Update
            break;
        }
      }
    });
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  // Contact Steps

  setStepContact(index: number) {
    this.stepContact = index;
  }

  nextStepContact() {
    this.stepContact++;
  }

  prevStepContact() {
    this.stepContact--;
  }

  // Address Steps

  setStepAddress(index: number) {
    this.stepAddress = index;
  }

  nextStepAddress() {
    this.stepAddress++;
  }

  prevStepAddress() {
    this.stepAddress--;
  }

  deleteContact(id) {
    this.store.dispatch(CustomerActions.removeContactFromCustomer({contact : {
      contactid: id,
      id: this.id
    }}))
  }

  deleteAdresse(id) {
    this.store.dispatch(CustomerActions.removeAdressFromCustomer({adress : {
      addressid: id,
      id: this.id
    }}))
  }

}
