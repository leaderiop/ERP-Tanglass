import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent, FieldConfig, FormDialog } from '@tanglass-erp/material';
import { FormArray, FormGroup } from '@angular/forms';
import { regConfigAddresses, regConfigContact, regCustomerConfig } from '../../../utils/forms';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { getSelectedCustomer } from '@TanglassStore/contact/lib/selectors/customer.selectors';
import * as CustomerActions from '@TanglassStore/contact/lib/actions/customer.actions';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-pop-customer',
  templateUrl: './pop-customer.component.html',
  styleUrls: ['./pop-customer.component.scss'],
})
export class PopCustomerComponent extends FormDialog implements AfterViewInit, OnDestroy {

  title = "Ajouter un client";
  regConfig: FieldConfig[];
  addressFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  contacts$ = this.store.select(ContactSelectors.getAllContacts);
  selectedSubscription: Subscription;
  addresses = [];
  contacts = [];
  customerForm: DynamicFormComponent;
  @ViewChildren(DynamicFormComponent) dynamicForms: QueryList<DynamicFormComponent>;
  get addressFormArray() {
    return this.addressFormGroup.get('addresses') as FormArray;
  }

  get contactFormArray() {
    return this.contactFormGroup.get('contacts') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<PopCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
    this.addressFormGroup = new FormGroup({addresses: new FormArray([])});
    this.contactFormGroup = new FormGroup({contacts: new FormArray([])});
  }

  buildForm(): void {
    this.regConfig = regCustomerConfig(this.data, this.contacts$);
    if (this.data?.id) {
      this.title = "Éditer un Client";
      this.store.dispatch(CustomerActions.loadCustomerById({id: this.data.id}));
      this.selectedSubscription = this.store.select(getSelectedCustomer)
        .pipe(filter((e) => !!e))
        .subscribe(value => {
          if (value?.id === this.data.id) {
            const obj: any = Object.assign({}, value);
            obj.contacts = obj.contacts.map((elem ) => elem.id);
            this.regConfig = regCustomerConfig(obj, this.contacts$);
          }
        });
    }
    this.store.dispatch(ContactActions.loadContacts());
  }

  ngAfterViewInit() {
    this.customerForm = this.dynamicForms
      .find(component => component.name === 'main');
    this.cdr.detectChanges();
    this.assignAllForms();
    this.dynamicForms.changes.subscribe(value => {
      this.assignAllForms();
    });
  }

  assignAllForms() {
    this.assignForms(this.addressFormArray, 'address');
    this.assignForms(this.contactFormArray, 'contact');
  }

  assignForms(formArray: FormArray, name: string) {
    const forms = this.dynamicForms.filter(
      (i, index) => i.name === name)
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
    this.addresses = this.addresses.filter(item => item !== addresse);
  }

  newContact() {
    this.contacts.push(Object.assign([], regConfigContact()));
  }

  deleteContact(contact) {
    this.contacts = this.contacts.filter(item => item !== contact);
  }

  flattenForm() {
    return Object.assign(
      {},
      this.customerForm.form.value,
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
