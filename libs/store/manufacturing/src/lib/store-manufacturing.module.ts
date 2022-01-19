import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromJobOrders from './+state/job-orders.reducer';
import { JobOrdersEffects } from './+state/job-orders.effects';
import { JobOrdersFacade } from './+state/job-orders.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromJobOrders.JOB_ORDERS_FEATURE_KEY,
      fromJobOrders.reducer
    ),
    EffectsModule.forFeature([JobOrdersEffects]),
  ],
  providers: [JobOrdersFacade],
})
export class StoreManufacturingModule {}
