import { Injectable } from '@angular/core';

import { DashboardQueryGQL } from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { adaptDashboardQuery } from '../utils/flatteningAdapter';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private dashboardQueryGQL: DashboardQueryGQL
  ) { }


  load(date1: Date, date2: Date) {
    return this.dashboardQueryGQL.fetch({
      date1,
      date2
    }).pipe(
      map(e => adaptDashboardQuery(e.data))
    );
  }
}
