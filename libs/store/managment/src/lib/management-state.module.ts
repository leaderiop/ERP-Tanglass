import { CompaniesEffects } from './effects/companies.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/user.effects';
import * as fromCompanies from './reducers/companies.reducer';
import * as fromSalePoints from './reducers/sale-point-reducer';
import * as fromUsers from './reducers/users.reducer';
import { SalePointEffects } from './effects/sale-point.effects';
import { CoreManagementModule } from '@tanglass-erp/core/management';
import { AlertEffects } from './effects/alert.effects';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    CoreManagementModule,
    StoreModule.forFeature(
      fromSalePoints.SALE_POINT_FEATURE_KEY,
      fromSalePoints.reducer,
      { metaReducers: [] }
    ),
    StoreModule.forFeature(fromUsers.USER_FEATURE_KEY, fromUsers.reducer, {
      metaReducers: [],
    }),
    StoreModule.forFeature(
      fromCompanies.COMPANIE_FEATURE_KEY,
      fromCompanies.reducer,
      { metaReducers: [] }
    ),
    EffectsModule.forFeature([
      CompaniesEffects,
      SalePointEffects,
      UsersEffects,
      AlertEffects,
    ]),
    ToastrModule.forRoot(),
  ],
})
export class ManagementStateModule {}
