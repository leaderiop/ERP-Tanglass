import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as ContactReducer from './reducers/contact.reducer';
import * as CustomerReducer from './reducers/customer.reducer';
import * as ProviderReducer from './reducers/provider.reducer';
import { ContactsEffects } from './effects/contact.effects';
import { CustomersEffects } from './effects/customer.effects';
import { ProvidersEffects } from './effects/provider.effects';
import { EffectsModule } from '@ngrx/effects';
import { contactAlertEffects } from './effects/alert.effects';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      ContactReducer.CONTACT_FEATURE_KEY,
      ContactReducer.reducer,

    ),
    StoreModule.forFeature(
      CustomerReducer.CUSTOMER_FEATURE_KEY,
      CustomerReducer.reducer,

    ),
    StoreModule.forFeature(
      ProviderReducer.PROVIDER_FEATURE_KEY,
      ProviderReducer.reducer,

    ),
    EffectsModule.forFeature([
      ContactsEffects,
      CustomersEffects,
      ProvidersEffects,
      contactAlertEffects
    ]),
    ToastrModule.forRoot(),
  ],
})
export class StoreContactModule {}
