import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { DetailedGlass } from '@TanglassStore/product/index';
import * as GlassActions from '@TanglassStore/product/lib/actions/glass.actions';
import { getSelectedGlass } from '@TanglassStore/product/lib/selectors/glass.selectors';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-glass-card',
  templateUrl: './glass-card.component.html',
  styleUrls: ['./glass-card.component.scss']
})
export class GlassCardComponent extends ModelCardComponent {
  title = "Verre";
  data$ = this.store.select(getSelectedGlass)
    .pipe(takeUntil(this._onDestroy));

  constructor(private store: Store<AppState>,
    public route: ActivatedRoute) {
    super(route);
  }

  dispatch(): void {
    this.store.dispatch(GlassActions.loadGlassById({ id: this.id }));
  }

  passData(data: DetailedGlass) {
    return [
      {
        label: "Infos",
        isToolbar:"true",
        cols:4,
        icons:[{name:"edit",tooltip:"Modification",event:"editMain"}],
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
        isToolbar:"true",
        cols:4,
        icons:[{name:"edit",tooltip:"Modification",event:"editMain"}],
        data:
          [
            { label: 'Epaisseur', value: data?.thickness },
            { label: 'createdAt', value: data?.createdAt },
            { label: 'createdBy', value: data?.createdBy },
            { label: 'updatedAt', value: data?.updatedAt },
            { label: 'updatedBy', value: data?.updatedBy },
          ]
      },

    ];
  }

  afterComplete() {}

}
