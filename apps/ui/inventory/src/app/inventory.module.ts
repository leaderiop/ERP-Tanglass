import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { WarehousesComponent } from './pages/warehouse/warehouses.component';
import { WarehouseCardComponent } from './pages/warehouse/warehouse-card/warehouse-card.component';
import { PopWarehouseComponent } from './pages/warehouse/pop-warehouse/pop-warehouse.component';
import { WarehouseConsumableComponent } from './pages/warehouse-consumable/warehouse-consumable.component';
import { WarehouseConsumableCardComponent } from './pages/warehouse-consumable/warehouse-consumable-card/warehouse-consumable-card.component';
import { WarehouseAccessoryComponent } from './pages/warehouse-accessory/warehouse-accessory.component';
import { WarehouseAccessoryCardComponent } from './pages/warehouse-accessory/warehouse-accessory-card/warehouse-accessory-card.component';
import { WarehouseGlasseComponent } from './pages/warehouse-glasse/warehouse-glasse.component';
import { WarehouseGlasseCardComponent } from './pages/warehouse-glasse/warehouse-glasse-card/warehouse-glasse-card.component';
import { StoreInventoryModule } from '@TanglassStore/inventory/index';
import { WarehouseTransfertComponent } from './pages/warehouse-transfert/warehouse-transfert.component';
import { PopWarehouseTransfertComponent } from './pages/warehouse-transfert/pop-warehouse-transfert/pop-warehouse-transfert.component';
import { StoreProductModule } from '@TanglassStore/product/lib/store-product.module';
import { TransfertCardComponent } from './pages/warehouse-transfert/transfert-card/transfert-card.component';
import { StoreSharedModule } from '@tanglass-erp/store/shared';
import { PopOrderItemComponent } from './pages/warehouse-transfert/pop-order-item/pop-order-item.component';
import { PopOrderItemDeliverComponent } from './pages/warehouse-transfert/pop-order-item-deliver/pop-order-item-deliver.component';
import { WarehouseTransferredComponent } from '@TanglassUi/inventory/pages/warehouse-transferred/warehouse-transferred.component';
import { PopTransferItemComponent } from '@TanglassUi/inventory/pages/warehouse-transfert/pop-transfer-item/pop-transfer-item.component';
import { StockAdjustmentComponent } from '@TanglassUi/inventory/pages/stock-adjustment/adjustments-list/stock-adjustment.component';
import { CreateAdjustmentComponent } from '@TanglassUi/inventory/pages/stock-adjustment/create-adjustment/create-adjustment.component';

const routes: Routes = [
  { path: '',
    component: InventoryComponent,
    children: [
      {
        path: 'warehouses',
        children: [
          { path: '', component: WarehousesComponent },
          { path: ':id', component: WarehouseCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: { title: 'Entrepôts', breadcrumb: "Entrepôts" }
      },
      {
        path: 'transfer',
        data: { title: 'Transfert', breadcrumb: "Transfert" },
        children : [
          { path: '', component: WarehouseTransfertComponent},
          { path: ':id', component: TransfertCardComponent, data: {breadcrumb: "Détails"} },
        ],
      },
      {
        path: 'transferred',
        data: { title: 'Transférés', breadcrumb: "Transférés" },
        children : [
          { path: '', component: WarehouseTransferredComponent},
        ]
      },
      {
        path: 'warehouse-consumable',
        component: WarehouseConsumableComponent,
        data: {title: 'Entrepôts de consommable', breadcrumb: "Entrepôts de consommable"}
      },
      {
        path: 'warehouse-consumable/:id',
        component: WarehouseConsumableCardComponent,
        data: {title: 'Entrepôts de consommable', breadcrumb: "Entrepôts de consommable"}
      },
      {
        path: 'warehouse-accessory',
        component: WarehouseAccessoryComponent,
        data: {title: 'Entrepôts d\'accessoires', breadcrumb: "Entrepôts d\'accessoires"}
      },
      {
        path: 'warehouse-accessory/:id',
        component: WarehouseAccessoryCardComponent,
        data: {title: 'Entrepôts d\'accessoires', breadcrumb: "Détails"}
      },
      {
        path: 'warehouse-glasse',
        component: WarehouseGlasseComponent,
        data: {title: 'Entrepôts de verre', breadcrumb: "Entrepôts de verre"}
      },
      {
        path: 'warehouse-glasse/:id',
        component: WarehouseGlasseCardComponent,
        data: {breadcrumb: "Détails"}
      },
      {
        path: 'stockAdjustment',
        children: [
          { path: '', component: StockAdjustmentComponent },
          { path: 'createAdjustment', component: CreateAdjustmentComponent },

         // { path: ':id', component: WarehouseCardComponent, data: {breadcrumb: "Détails"} },
        ],
        data: { title: 'Ajustements', breadcrumb: "Ajustements" }
      },
    ] }
];

@NgModule({
  declarations: [
    InventoryComponent,
    WarehousesComponent,
    WarehouseCardComponent,
    PopWarehouseComponent,
    WarehouseConsumableComponent,
    WarehouseConsumableCardComponent,
    WarehouseAccessoryComponent,
    WarehouseAccessoryCardComponent,
    WarehouseGlasseComponent,
    WarehouseGlasseCardComponent,
    PopWarehouseTransfertComponent,
    PopTransferItemComponent,
    WarehouseTransfertComponent,
    TransfertCardComponent,
    PopOrderItemComponent,
    PopOrderItemDeliverComponent,
    WarehouseTransferredComponent,
    StockAdjustmentComponent,
    CreateAdjustmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainAgGridModule,
    StoreInventoryModule,
    StoreSharedModule,
    StoreProductModule
  ]
})
export class InventoryModule { }
