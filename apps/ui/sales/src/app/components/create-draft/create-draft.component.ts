import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { regConfigDraftInfos } from '@TanglassUi/sales/utils/forms';
import { FieldConfig } from '@tanglass-erp/material';
import { Store } from '@ngrx/store';
import * as ShortCompanieSelectors from '@TanglassStore/shared/lib/+state/company/short-company.selectors';
import * as CustomerSelectors from '@TanglassStore/contact/lib/selectors/customer.selectors';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { map } from 'rxjs/operators';
import { DraftFacade } from '@tanglass-erp/store/sales';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-create-draft',
  templateUrl: './create-draft.component.html',
  styleUrls: ['./create-draft.component.scss']
})
export class CreateDraftComponent implements OnInit {

  regConfig: FieldConfig[];
  companies$ = this.store.select(ShortCompanieSelectors.getAllShortCompany);
  customer$ = this.store.select(CustomerSelectors.getAllCustomers);
  contacts$ = this.store.select(ContactSelectors.getAllContacts);

  dataSub: Subscription
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private facade: DraftFacade,
  ) {}

  ngOnInit(): void {
    this.facade.createDraft();
    this.buildForm();
  }

  buildForm(): void {
    let data
    this.regConfig = regConfigDraftInfos(
      data,
      this.customer$,
      this.contacts$,
      this.companies$.pipe(map(item => item.map(company => ({ key: company.id, value: company.name })))),
    );
  }
  ngOnDestroy() {
  }
}
