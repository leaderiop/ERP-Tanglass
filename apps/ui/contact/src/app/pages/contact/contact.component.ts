import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { ErpPermissions,GridView, MainGridComponent, Operations } from '@tanglass-erp/ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { PopContactComponent } from './pop-contact/pop-contact.component';
import { ContactHeaders } from '../../utils/grid-headers';
import { Contact, InsertedContact } from '@TanglassStore/contact/index';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { ConstactsPermissions } from "@TanglassUi/contact/utils/permissions";


@Component({
  selector: 'tanglass-erp-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements GridView {
  @ViewChild(MainGridComponent) mainGrid;
  agGrid: AgGridAngular;
  columnDefs;
  columnId: string = 'id';
  data$ =  this.store.select(ContactSelectors.getAllContacts);
  permissions: ErpPermissions = ConstactsPermissions.get(
    this.authFacadeService.currentUser.role
  );
  constructor(public dialog: MatDialog, private store: Store<AppState>,
    private authFacadeService: AuthFacadeService
    ) {
    this.setColumnDefs();
  }

  ngAfterViewInit(): void {
    this.agGrid = this.mainGrid.agGrid;
  }

  ngOnInit(): void {
    this.store.dispatch(ContactActions.loadContacts());
  }

  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopContactComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
          const insertedContact = this.contactAdapter(result.contact, result.affectation);
          this.store.dispatch(ContactActions.addContact({contact: insertedContact}));
        } else if (action === Operations.update) {
          result.contact['id'] = data['id'];
          this.store.dispatch(ContactActions.updateContact({contact: result.contact}));
        }
      }
    });
  }

  contactAdapter(contact: Contact, affectation) {
    const insertedContact: InsertedContact = {
      ...contact,
    };
    insertedContact.affectedCustomers = affectation.customers||[];
    insertedContact.affectedProviders = affectation.provider||[];
    insertedContact.customers = [];
    insertedContact.providers = [];
    return insertedContact;
  }

  eventTriggering(event) {
    // Store Action Dispatching
    switch (event.action) {
      case Operations.add:
      case Operations.update:
        this.openDialog(event.action, event.data);
        break;
      case Operations.delete:
        this.store.dispatch(ContactActions.removeContact({contactId: event.data[0].id}));
        break;
    }
  }

  setColumnDefs(): void {
    this.columnDefs = [
      ...ContactHeaders,
      { field: 'id', headerName: 'Action', type: "editColumn"},
    ];
  }

}
