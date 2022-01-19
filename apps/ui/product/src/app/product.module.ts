import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ListGlasseComponent } from './pages/list-glasse/list-glasse.component';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { PopGlasseComponent } from './pages/list-glasse/pop-glasse/pop-glasse.component';
import { ListConsumableComponent } from './pages/list-consumable/list-consumable.component';
import { PopConsumableComponent } from './pages/list-consumable/pop-consumable/pop-consumable.component';
import { ListAccessoriesComponent } from './pages/list-accessories/list-accessories.component';
import { PopAccessoriesComponent } from './pages/list-accessories/pop-accessories/pop-accessories.component';
import { ListServiceComponent } from './pages/list-service/list-service.component';
import { PopCustomerProductComponent } from './pages/list-customer-product/pop-customer-product/pop-customer-product.component';
import { ListCustomerProductComponent } from './pages/list-customer-product/list-customer-product.component';
import { ListServiceConsumableComponent } from './pages/list-service-consumable/list-service-consumable.component';
import { PopServiceConsumableComponent } from './pages/list-service-consumable/pop-service-glasse/pop-service-consumable.component';
import { ServiceCardComponent } from './pages/list-service/service-card/service-card.component';
import { ServiceCardItemComponent } from './components/service-card-item/service-card-item.component';
import { AccessoryCardComponent } from './pages/list-accessories/accessory-card/accessory-card.component';
import { GlassCardComponent } from './pages/list-glasse/glass-card/glass-card.component';
import { ConsumableCardComponent } from './pages/list-consumable/consumable-card/consumable-card.component';
import { CustomerProductCardComponent } from './pages/list-customer-product/customer-product-card/customer-product-card.component';
import { PopServiceConfigComponent } from './pages/list-service/pop-service-config/pop-service-config.component';
import { PopServiceComponent } from './pages/list-service/service-card/pop-service/pop-service.component';
import { StoreProductModule } from '@TanglassStore/product/index';
import { StoreSharedModule } from '@tanglass-erp/store/shared';
import { PopSuppliesComponent } from '@TanglassUi/product/pages/list-supplies/pop-supplies/pop-supplies.component';
import { ListSuppliesComponent } from '@TanglassUi/product/pages/list-supplies/list-supplies.component';
import { SupplyCardComponent } from '@TanglassUi/product/pages/list-supplies/supplies-card/supply-card.component';
import { ThemeModule } from '@TanglassTheme/theme.module';
import { PopServiceConfigUpdateComponent } from '@TanglassUi/product/pages/list-service/pop-service-config-update/pop-service-config-update.component';


const popUps = [
  PopConsumableComponent,
  PopAccessoriesComponent,
  PopGlasseComponent,
  PopServiceConfigComponent,
  PopServiceConfigUpdateComponent,
  PopServiceConsumableComponent,
  PopCustomerProductComponent,
  PopServiceComponent,
  PopSuppliesComponent
];


const pages = [
  ProductComponent,
  ListGlasseComponent,
  ListConsumableComponent,
  ListAccessoriesComponent,
  ListServiceComponent,
  ListCustomerProductComponent,
  ListServiceConsumableComponent,
  ListSuppliesComponent
];

const cardPages = [
  ServiceCardComponent,
  AccessoryCardComponent,
  GlassCardComponent,
  ConsumableCardComponent,
  CustomerProductCardComponent,
  SupplyCardComponent
];

const otherComponents = [
  ServiceCardItemComponent,
];



const routes: Routes = [
  {
    path: '', component: ProductComponent,
    children: [
      {
        path: 'glass',
        children: [
          { path: '', component: ListGlasseComponent },
          { path: ':id', component: GlassCardComponent, data: {breadcrumb: "Détails"}},
        ],
        data: {title: 'Verres', breadcrumb: "Verres"}
      },
      {
        path: 'consumable',
        children: [
          { path: '', component: ListConsumableComponent  },
          { path: ':id', component: ConsumableCardComponent, data: {breadcrumb: "Détails"}},
        ],
        data: {title: 'Consommables', breadcrumb: "Consommables"}
      },
      {
        path: 'accessory',
        children: [
          { path: '', component: ListAccessoriesComponent  },
          { path: ':id', component: AccessoryCardComponent, data: {breadcrumb: "Détails"}},
        ],
        data: {title: 'Accessoires', breadcrumb: "Accessoires"}
      },
      {
        path: 'supplies',
        children: [
          { path: '', component: ListSuppliesComponent  },
          { path: ':id', component: SupplyCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Fournitures', breadcrumb: "Fournitures"}
      },
      {
        path: 'service',
        children: [
          { path: '', component: ListServiceComponent  },
          { path: ':id', component: ServiceCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Services', breadcrumb: "Services"}
      },

      {
        path: 'customerProduct',
        children: [
          { path: '', component: ListCustomerProductComponent },
          { path: ':id', component: CustomerProductCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: {title: 'Articles Clients', breadcrumb: "Articles Clients"}
      },
      {
        path: 'listServicesConsommable',
        component: ListServiceConsumableComponent,
        data: {title: 'Services consommables', breadcrumb: "Services consommables"}
      }
    ]
  },
];
@NgModule({
  declarations: [
    ...pages,
    ...cardPages,
    ...otherComponents,
    ...popUps
  ],
  imports: [
    RouterModule.forChild(routes),
    MainAgGridModule,
    StoreProductModule,
    StoreSharedModule,
    ThemeModule
  ]
})
export class ProductModule { }
