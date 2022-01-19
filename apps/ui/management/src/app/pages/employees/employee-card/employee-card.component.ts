import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import * as UserActions from '@TanglassStore/management/lib/actions/user.actions';
import * as UserSelectors from '@TanglassStore/management/lib/selectors/user.selectors';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-sale-point-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent extends ModelCardComponent {
  title = "Profile d'utilisateur";
  id: string;
  step = null;
  data$ = this.store.select(UserSelectors.getSelectedUser);
  passedData: any;
  constructor(private store: Store<AppState>,
              public route: ActivatedRoute) {
    super(route);
  }

  afterComplete() {
  }

  dispatch(): void {
    this.store.dispatch(UserActions.loadUserById({id: this.id}));
  }

  passData(data) {
    return [
      {
        label: "Infos Générales",
        isToolbar:"true",
        cols:3,
        'cols-md': 2,
        icons:[{name:"edit",tooltip:"Modification",event:'editMain'}],
        data:
          [
            {label: 'Nom d\'utilisateur', value: data?.username},
            {label: 'Nom', value: data?.lastname},
            {label: 'Prénom', value: data?.firstname},
            {label: 'E-mail', value: data?.email, type: 'mail'},
            {label: 'Téléphone', value: data?.phone, type: 'phone'},
            {label: 'CIN', value: data?.CIN},
            {label: 'Rejoignez à', value: data?.joinUs, type: 'date'},
            {label: 'Role', value: data?.role},
            {label: 'Active', value: data?.active ? 'oui' : 'non'},
            {label: 'Point de vente', value: ''},
            { label: 'createdAt', value: data?.createdAt, type: 'date' },
            { label: 'createdBy', value: data?.createdBy },
            { label: 'updatedAt', value: data?.updatedAt, type: 'date' },
            { label: 'updatedBy', value: data?.updatedBy },
          ]
      },
      {
        label: "Point de vente",
        isToolbar:"true",
        toolbarIcon:'point_of_sale',
        cols:3,
        "cols-md":2,
        "cols-sm":1,
        data:
          [
            { label: 'Nom', value: data?.SalesPoint?.name },
            { label: 'Phone', value: data?.SalesPoint?.phone },
            { label: 'Adresse', value: data?.SalesPoint?.address },
          ]
      },
    ];
  }

}
