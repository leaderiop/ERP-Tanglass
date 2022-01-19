import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent, FieldConfig, FormDialog } from '@tanglass-erp/material';
import { FormArray, FormGroup } from '@angular/forms';
import { regConfigAddresses, regConfigContact, regConfigProvider } from '../../../utils/forms';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { getSelectedProvider } from '@TanglassStore/contact/lib/selectors/provider.selectors';
import { loadProviderById } from '@TanglassStore/contact/lib/actions/provider.actions';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-pop-contact',
  templateUrl: './pop-provider.component.html',
  styleUrls: ['./pop-provider.component.scss'],
})
export class PopProviderComponent
  extends FormDialog
  implements AfterViewInit, OnDestroy {
  title = 'Ajouter un fournisseur';
  regConfig: FieldConfig[];
  addressFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  contacts$ = this.store.select(ContactSelectors.getAllContacts);
  selectedSubscription: Subscription;
  addresses = [];
  contacts = [];
  providerForm: DynamicFormComponent;
  @ViewChildren(DynamicFormComponent) dynamicForms: QueryList<
    DynamicFormComponent
  >;

  get addressFormArray() {
    return this.addressFormGroup.get('addresses') as FormArray;
  }

  get contactFormArray() {
    return this.contactFormGroup.get('contacts') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<PopProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
    this.addressFormGroup = new FormGroup({ addresses: new FormArray([]) });
    this.contactFormGroup = new FormGroup({ contacts: new FormArray([]) });
  }

  buildForm(): void {
    this.regConfig = regConfigProvider(this.data, this.contacts$);
    if (this.data?.id) {
      this.title = 'Éditer un Fournisseur';
      this.store.dispatch(loadProviderById({ id: this.data.id }));
      this.selectedSubscription = this.store
        .select(getSelectedProvider)
        .pipe(filter((e) => !!e))
        .subscribe((value) => {
          if (value) {
            const obj: any = { ...value };
            obj.contacts = obj.contacts.map((elem) => elem.id);
            this.regConfig = regConfigProvider(obj, this.contacts$);
          }
        });
    }
    this.store.dispatch(ContactActions.loadContacts());
  }

  ngAfterViewInit() {
    this.providerForm = this.dynamicForms.find(
      (component) => component.name === 'main'
    );
    this.cdr.detectChanges();
    this.assignAllForms();
    this.dynamicForms.changes.subscribe((value) => {
      this.assignAllForms();
    });
  }

  assignAllForms() {
    this.assignForms(this.addressFormArray, 'address');
    this.assignForms(this.contactFormArray, 'contact');
  }

  assignForms(formArray: FormArray, name: string) {
    const forms = this.dynamicForms
      .filter((i, index) => i.name === name)
      .map((dynamicForm: DynamicFormComponent) => dynamicForm.form);

    while (formArray.length) {
      formArray.removeAt(0);
    }
    forms.forEach((form) => formArray.push(form));
  }

  newAddress() {
    this.addresses.push(Object.assign([], regConfigAddresses()));
  }

  deleteAddress(addresse) {
    this.addresses = this.addresses.filter((item) => item !== addresse);
  }

  newContact() {
    this.contacts.push(Object.assign([], regConfigContact()));
  }

  deleteContact(contact) {
    this.contacts = this.contacts.filter((item) => item !== contact);
  }

  flattenForm() {
    return Object.assign(
      {},
      this.providerForm.form.value,
      this.addressFormGroup.value,
      this.contactFormGroup.value
    );
  }

  submitAll() {
    this.closePopup();
    this.submit(this.flattenForm());
  }

  ngOnDestroy(): void {
    this.selectedSubscription && this.selectedSubscription.unsubscribe();
  }
}
