import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonModule } from '@tanglass-erp/core/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShortCompany from './+state/company/short-company.reducer';
import * as fromShortSalePoint from './+state/salePoint/short-salePoint.reducer';
import { ShortCompanyEffects } from './+state/company/short-company.effects';
import { ShortSalePointEffects } from './+state/salePoint/short-salePoint.effects';
import { SharedFacade } from './+state/shared.facade';
import * as fromShortWarehouse from './+state/warehouse/short-warehouse.reducer';
import { ShortWarehouseEffects } from './+state/warehouse/short-warehouse.effects';
import * as fromWarehouseSubstance from './+state/warehouse-substance/warehouse-glass.reducer';
import { WarehouseSubstanceEffects } from './+state/warehouse-substance/warehouse-glass.effects';
import * as fromShortProduct from './+state/product/short-product.reducer';
import { ShortProductEffects } from './+state/product/short-product.effects';
import * as fromShortProvider from './+state/provider/short-provider.reducer';
import { ShortProviderEffects } from './+state/provider/short-provider.effects';
import * as fromWarehouseAccessory from './+state/warehouse-substance/warehouse-accessory.reducer';
import { WarehouseAccessoryEffects } from './+state/warehouse-substance/warehouse-accessory.effects';
import * as fromOrdersSalepoint from './+state/orders-salepoint/orders-salepoint.reducer';
import { OrdersSalepointEffects } from './+state/orders-salepoint/orders-salepoint.effects';
import * as fromEmployees from './+state/employees/employees.reducer';
import { EmployeesEffects } from './+state/employees/employees.effects';
import * as fromOrdersClientordersClient from './+state/orders-client/orders-client.reducer';
import { OrdersClientEffects } from './+state/orders-client/orders-client.effects';
import { StoreAppModule } from "@tanglass-erp/store/app";
@NgModule({
  imports: [
    CommonModule,
    CoreCommonModule,
    StoreAppModule,
    StoreModule.forFeature(
      fromShortCompany.SHORTCOMPANY_FEATURE_KEY,
      fromShortCompany.reducer
    ),
    EffectsModule.forFeature([ShortCompanyEffects]),
    StoreModule.forFeature(
      fromShortWarehouse.SHORTWAREHOUSE_FEATURE_KEY,
      fromShortWarehouse.reducer
    ),
    EffectsModule.forFeature([ShortWarehouseEffects]),
    StoreModule.forFeature(
      fromWarehouseSubstance.WAREHOUSE_GLASS_FEATURE_KEY,
      fromWarehouseSubstance.reducer
    ),
    StoreModule.forFeature(
      fromShortSalePoint.SHORTSALEPOINT_FEATURE_KEY,
      fromShortSalePoint.reducer
    ),
    EffectsModule.forFeature([
      WarehouseSubstanceEffects,
      ShortSalePointEffects,
    ]),
    StoreModule.forFeature(
      fromShortProduct.SHORT_PRODUCT_FEATURE_KEY,
      fromShortProduct.reducer
    ),
    EffectsModule.forFeature([ShortProductEffects]),
    StoreModule.forFeature(
      fromShortProvider.SHORT_PROVIDER_FEATURE_KEY,
      fromShortProvider.reducer
    ),
    EffectsModule.forFeature([ShortProviderEffects]),
    StoreModule.forFeature(
      fromWarehouseAccessory.WAREHOUSE_ACCESSORY_FEATURE_KEY,
      fromWarehouseAccessory.reducer
    ),
    EffectsModule.forFeature([WarehouseAccessoryEffects]),
    StoreModule.forFeature(
      fromOrdersSalepoint.ORDERS_SALEPOINT_FEATURE_KEY,
      fromOrdersSalepoint.reducer
    ),
    EffectsModule.forFeature([OrdersSalepointEffects]),
    StoreModule.forFeature(
      fromEmployees.EMPLOYEES_FEATURE_KEY,
      fromEmployees.reducer
    ),
    EffectsModule.forFeature([EmployeesEffects]),
    StoreModule.forFeature(
      fromOrdersClientordersClient.CLIENT_ORDERS_FEATURE_KEY,
      fromOrdersClientordersClient.reducer
    ),
    EffectsModule.forFeature([OrdersClientEffects]),
  ],
  providers: [SharedFacade],
})
export class StoreSharedModule {}
