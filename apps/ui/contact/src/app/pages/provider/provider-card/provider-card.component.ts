import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { MatDialog } from '@angular/material/dialog';
import { PopProviderComponent } from '../pop-provider/pop-provider.component';
import { getSelectedProvider } from '@TanglassStore/contact/lib/selectors/provider.selectors';
import * as ProviderActions from '@TanglassStore/contact/lib/actions/provider.actions';
import { loadProviderById } from '@TanglassStore/contact/lib/actions/provider.actions';
import { PopAddressComponent } from '../../components/pop-address/pop-address.component';
import { PopShortContactComponent } from '../../contact/pop-short-contact/pop-short-contact.component';
import { ActivatedRoute } from '@angular/router';
import { ModelCardComponent } from '@tanglass-erp/material';
import { filter, takeUntil } from 'rxjs/operators';
import { Address, Contact, DetailedProvider } from '@TanglassStore/contact/index';


const componentMapper = {
  address: PopAddressComponent,
  contact: PopShortContactComponent,
  provider: PopProviderComponent
};

@Component({
  selector: 'ngx-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderCardComponent extends ModelCardComponent {
  title = "Fournisseur";
  gap = "50px";
  showMessage = 'afficher';
  hideMessage = 'cacher';
  stepContact = null;
  stepAddress = null;
  data$ = this.store.select(getSelectedProvider)
    .pipe(filter((e) => !!e), takeUntil(this._onDestroy));

  contactPassedData = (contact: Contact) => [

    {
      cols: 3,
      data:
        [
          { label: 'Code', value: contact?.code },
          { label: 'Nom', value: contact?.name },
          { label: 'E-mail', value: contact?.mail, type: 'mail' },
          { label: 'Téléphone', value: contact?.phone, type: 'phone' },
          { label: 'Note', value: contact?.note },
        ]
    },
  ]
  addressPassedData = (address: Address) => [
    {
      cols: 3,
      data:
        [
          { label: 'Adresse', value: address?.address },
          { label: 'Ville', value: address?.city },
          { label: 'Code Postal', value: address?.zip },
        ]
    },
  ]

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    super(route);
  }

  dispatch(): void {
    this.store.dispatch(loadProviderById({ id: this.id }));
  }

  passData(data: DetailedProvider) {
    return [


      {
        label: "Infos Générales",
        isToolbar: "true",
        cols: 3,
        icons: [{ name: "edit", tooltip: "Modification" ,event:'editMain'}],
        data:
          [
            { label: 'Code', value: data?.code },
            { label: 'Nom', value: this.data?.name },
            { label: 'Note', value: this.data?.note },
            { label: 'Téléphone', value: this.data?.phone, type: 'phone' },
            { label: 'E-mail', value: this.data?.mail, type: 'mail' },
            { label: 'createdAt', value: data?.createdAt },
            { label: 'createdBy', value: data?.createdBy },
            { label: 'updatedAt', value: data?.updatedAt },
            { label: 'updatedBy', value: data?.updatedBy },
          ]
      },
    ];
  }
  afterComplete() {
    this.cdRef.detectChanges();
  }

  openDialog(model, data = {}) {
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
            this.store.dispatch(ProviderActions.addAdressToProvider({adress: {
              id : this.id,
              address : result,
            }}))
            break;
          case 'contact': // Add
            this.store.dispatch(ProviderActions.addContactToProvider({contact: {
              id : this.id,
              contact : result,
            }}))
            break;
          case 'provider': // Update
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
    this.store.dispatch(ProviderActions.removeContactFromProvider({contact : {
      contactid: id,
      id: this.id
    }}))
  }

  deleteAdresse(id) {
    this.store.dispatch(ProviderActions.removeAdressFromProvider({adress : {
      addressid: id,
      id: this.id
    }}))
  }
}
