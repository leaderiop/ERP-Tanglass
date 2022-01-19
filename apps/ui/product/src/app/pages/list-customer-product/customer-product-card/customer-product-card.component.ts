import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import { Observable } from 'rxjs';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-service-glass-card',
  templateUrl: './customer-product-card.component.html',
  styleUrls: ['./customer-product-card.component.scss']
})
export class CustomerProductCardComponent extends ModelCardComponent {
  title = "Service Verre";
  data$: Observable<any>;

  constructor(private store: Store<AppState>,
              public route: ActivatedRoute) {
    super(route);
  }

  afterComplete() {
  }

  dispatch(): void {
  }

  passData(data) {
    return [
      {label: 'Nom', value: data?.service?.name},
      {label: 'Paramètres', value: data?.service?.name},
      {label: 'Type de verre', value: data?.glass?.type},
      {label: 'Couleur de verre', value: data?.glass?.color},
      {label: 'Epaisseur de verre', value: data?.glass?.thickness},
    ];
  }
}
