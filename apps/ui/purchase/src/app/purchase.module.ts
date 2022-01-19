import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { PurchaseComponent } from './purchase.component';
import { AddDeliveryComponent } from './pages/purchase/add-delivery/add-delivery.component';
import { PurchaseDeliveryComponent } from './pages/purchase/purchase-delivery.component';
import { StoreSharedModule } from '@tanglass-erp/store/shared';
import { PurchaseReturnedComponent } from '@TanglassUi/purchase/pages/purchase-returned/purchase-returned.component';
import { StorePurchaseModule } from '@tanglass-erp/store/purchase';
import { DeliveryCardComponent } from '@TanglassUi/purchase/pages/purchase/delivery-card/delivery-card.component';
import { PopDeliveryItemComponent } from '@TanglassUi/purchase/components/add-delivery/pop-delivery-item.component';
import { StoreProductModule } from '@TanglassStore/product/lib/store-product.module';
import { StoreContactModule } from '@TanglassStore/contact/index';
import { DeliveriItemsComponent } from '@TanglassUi/purchase/components/Items-table/deliveryItems.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    children: [
      {
        path: 'reception',
        children: [
          { path: '', component: PurchaseDeliveryComponent },

          { path: 'addDelivery', component: AddDeliveryComponent,
          data: { breadcrumb: 'Ajouter' }, },
          {
            path: ':id',
            component: DeliveryCardComponent,
            data: { breadcrumb: 'Détails' },
          },
        ],
        data: { title: 'Réception', breadcrumb: 'Réception' },
      },
      {
        path: 'returned',
        component: PurchaseReturnedComponent,
        data: { title: 'Retournés', breadcrumb: 'Retournés' },
      },
    ],
  },
];
@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseDeliveryComponent,
    AddDeliveryComponent,
    PurchaseReturnedComponent,
    PopDeliveryItemComponent,
    DeliveryCardComponent,
    DeliveriItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainAgGridModule,
    StoreSharedModule,
    StorePurchaseModule,
    StoreProductModule,
    StoreContactModule
  ],
})
export class PurchaseModule {}
