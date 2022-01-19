import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as AccessoryReducer from './reducers/accessory.reducer';
import * as ConsumableReducer from './reducers/consumable.reducer';
import * as GlassReducer from './reducers/glass.reducer';
import * as CustomerProductReducer from './reducers/customer-product.reducer';

import * as ServiceReducer from './reducers/servicesConfig.reducer';
import * as SupplyReducer from './reducers/supply.reducer';
import * as ServiceChildReducer from './reducers/service.reducer';
import { AccessoryEffects } from './effects/accessory.effects';
import { ConsumableEffects } from './effects/consumable.effects';
import { GlassEffects } from './effects/glass.effects';
import { CutomerProductEffects } from './effects/customer-product.effects';
import { EffectsModule } from '@ngrx/effects';
import { AlertEffects } from './effects/alert.effects';
import { ServiceEffects } from './effects/servicesConfig.effects';
import { ServiceChildsEffects } from './effects/service.effects';

import { ToastrModule } from 'ngx-toastr';
import { CoreProductModule } from '@tanglass-erp/core/product';
import { GlassFacadeService } from '@TanglassStore/product/lib/+state/glass.facade.service';
import { AccessoryFacadeService } from '@TanglassStore/product/lib/+state/accessory.facade.service';
import { SupplyFacadeService } from '@TanglassStore/product/lib/+state/supply.facade.service';
import { ServiceFacadeService } from '@TanglassStore/product/lib/+state/service.facade.service';
import { CustomerProductFacadeService } from '@TanglassStore/product/lib/+state/customer-product.facade.service';
import { ConsumableFacadeService } from '@TanglassStore/product/lib/+state/consumable.facade.service';
import * as fromSubstances from './reducers/substances.reducer';
import { SubstancesEffects } from './effects/substances.effects';
import { SubstancesFacade } from './+state/substances.facade';

@NgModule({
  imports: [
    CommonModule,
    CoreProductModule,
    StoreModule.forFeature(
      AccessoryReducer.ACCESSORY_FEATURE_KEY,
      AccessoryReducer.reducer
    ),
    StoreModule.forFeature(
      ConsumableReducer.CONSUMABLE_FEATURE_KEY,
      ConsumableReducer.reducer
    ),

    StoreModule.forFeature(
      GlassReducer.GLASS_FEATURE_KEY,
      GlassReducer.reducer
    ),
    StoreModule.forFeature(
      CustomerProductReducer.CUSTOMER_PRODUCT_FEATURE_KEY,
      CustomerProductReducer.reducer
    ),
    StoreModule.forFeature(
      ServiceReducer.SERVICE_CONFIG_FEATURE_KEY,
      ServiceReducer.reducer
    ),
    StoreModule.forFeature(
      SupplyReducer.SUPPLY_FEATURE_KEY,
      SupplyReducer.reducer
    ),
    StoreModule.forFeature(
      ServiceChildReducer.SERVICE_FEATURE_KEY,
      ServiceChildReducer.reducer
    ),


    EffectsModule.forFeature([
      AccessoryEffects,
      ConsumableEffects,
      GlassEffects,
      AlertEffects,
      ServiceEffects,
      ServiceChildsEffects,
      CutomerProductEffects,
    ]),
    ToastrModule.forRoot(),

    StoreModule.forFeature(
      fromSubstances.SUBSTANCES_FEATURE_KEY,
      fromSubstances.reducer
    ),
    EffectsModule.forFeature([SubstancesEffects]),
  ],
  providers: [
    GlassFacadeService,
    AccessoryFacadeService,
    SupplyFacadeService,
    ServiceFacadeService,
    CustomerProductFacadeService,
    ConsumableFacadeService,
    SubstancesFacade,
  ],
})
export class StoreProductModule {}
