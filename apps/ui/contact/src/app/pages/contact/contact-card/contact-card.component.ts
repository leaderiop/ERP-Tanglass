import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import * as ContactActions from '@TanglassStore/contact/lib/actions/contact.actions';
import * as ContactSelectors from '@TanglassStore/contact/lib/selectors/contact.selectors';
import { ModelCardComponent } from '@tanglass-erp/material';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DetailedContact } from '@TanglassStore/contact/index';

@Component({
  selector: 'ngx-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent extends ModelCardComponent {
  title = "Contact";
  gap = "50px";
  data$ = this.store.select(ContactSelectors.getSelectedContact)
    .pipe(takeUntil(this._onDestroy));

  constructor(private store: Store<AppState>,
              public route: ActivatedRoute) {
    super(route);
  }

  dispatch(): void {
    this.store.dispatch(ContactActions.loadContactById({id: this.id}));
  }

  afterComplete() {}

  passData(data?: DetailedContact) {
    return [
      {
        label: "Infos Générales",
        isToolbar:"true",
        cols:4,
        "cols-sm":2,
        "cols-md":3,
        "cols-lg":4,
        icons:[{name:"edit",tooltip:"Modification",event:'editMain'}],
        data:
          [
            { label: 'Nom', value: data?.name },
            { label: 'Code', value: data?.code },
            { label: 'Note', value: data?.note },
            { label: 'E-mail', value: data?.mail, type: 'mail' },
            { label: 'Téléphone', value: data?.phone, type: 'phone' },
            { label: 'createdAt', value: data?.createdAt },
            { label: 'createdBy', value: data?.createdBy },
            { label: 'updatedAt', value: data?.updatedAt },
            { label: 'updatedBy', value: data?.updatedBy },
          ]
      },
    ];
  }

  eventTriggering(event) {
    // Store Action Dispatching update

  }
}
