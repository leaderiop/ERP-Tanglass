import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import * as SupplyActions from '@TanglassStore/product/lib/actions/supply.actions';
import { getSelectedSupply } from '@TanglassStore/product/lib/selectors/supply.selectors';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ngx-supply-card',
  templateUrl: './supply-card.component.html',
  styleUrls: ['./supply-card.component.scss']
})
export class SupplyCardComponent extends ModelCardComponent {
  title = "Fourniture";
  data$=  this.store.select(getSelectedSupply).pipe(takeUntil(this._onDestroy));
  constructor(private store: Store<AppState>,
    public route: ActivatedRoute) {
    super(route);
  }

  dispatch(): void {
    // Load data
    this.store.dispatch(SupplyActions.loadSupplyById({ id: this.id }));

  }
  passData(data: any) {
    return [
      {
        label: "Infos",
        isToolbar:"true",
        cols:3,
        icons:[{name:"edit",tooltip:"Modification",event:'editMain'}],
        data:
          [
            { label: 'Code', value: data?.product.code },
            { label: 'Désignation', value: data?.product.label },
            { label: 'Unité', value: data?.product.unit },
            { label: 'Prix', value: data?.product?.price },
            { label: 'Prix min', value: data?.product?.priceMin },
            { label: 'Prix max', value: data?.product?.priceMax },
            { label: 'Sociétés', value: data?.product?.companies.map(item => item.name), type: 'chips' }
          ]
      },
      {
        label: "Détails",
        cols:3,
        isToolbar:"true",
        icons:[{name:"edit",tooltip:"Modification"}],
        data:
          [
            { label: 'Type', value: data?.category },
            { label: 'createdAt', value: data?.createdAt },
            { label: 'createdBy', value: data?.createdBy },
            { label: 'updatedAt', value: data?.updatedAt },
            { label: 'updatedBy', value: data?.updatedBy },
          ]

      },

    ];
  }

  afterComplete() { }


}
