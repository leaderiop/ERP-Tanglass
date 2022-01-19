import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from '@TanglassUi/sales/sales-routing.module';
import { SalesComponent } from '@TanglassUi/sales/sales.component';
import { DraftComponent } from '@TanglassUi/sales/pages/draft/draft.component';
import { CreateDraftComponent } from '@TanglassUi/sales/components/create-draft/create-draft.component';
import { ProductDraftComponent } from '@TanglassUi/sales/components/product-draft/product-draft.component';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { MaterialModule } from '@tanglass-erp/material';
import { StoreSharedModule } from '@tanglass-erp/store/shared';
import { StoreProductModule } from '@TanglassStore/product/index';
import { StoreSalesModule } from '@tanglass-erp/store/sales';
import { StoreContactModule } from '@TanglassStore/contact/index';
import { QuotationComponent } from '@TanglassUi/sales/pages/quotation/quotation.component';
import { OrderComponent } from '@TanglassUi/sales/pages/order/order.component';
import { CreateQuotationComponent } from '@TanglassUi/sales/pages/quotation/create-quotation/create-quotation.component';
import { CreateOrderComponent } from '@TanglassUi/sales/pages/order/create-order/create-order.component';
import { AmountsOrderComponent } from '@TanglassUi/sales/components/amounts-order/amounts-order.component';
import { DeliveryListComponent } from '@TanglassUi/sales/pages/delivery/delivery-list/delivery-list.component';
import { DeliveryAddComponent } from '@TanglassUi/sales/pages/delivery/delivery-add/delivery-add.component';
import { DeliveryLineComponent } from '@TanglassUi/sales/components/delivery-line/delivery-line.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OrderCardComponent } from '@TanglassUi/sales/pages/order/order-card/order-card.component';
import { InvoiceListComponent } from '@TanglassUi/sales/pages/invoice/invoice-list/invoice-list.component';
import { InvoiceAddComponent } from '@TanglassUi/sales/pages/invoice/invoice-add/invoice-add.component';
import { InvoiceReadyComponent } from '@TanglassUi/sales/pages/invoice/invoice-ready/invoice-ready.component';
import { DeliveriesAccordionComponent } from '@TanglassUi/sales/components/deliveries-accordion/deliveries-accordion.component';
import { PopPaymentComponent } from '@TanglassUi/sales/components/payments-order/pop-payement/pop-payment.component';
import { ManagementStateModule } from '@TanglassStore/management/lib/management-state.module';
import { PaymentsComponent } from '@TanglassUi/sales/components/payments-order/payments.component';
import { QuotationCardComponent } from '@TanglassUi/sales/pages/quotation/quotation-card/quotation-card.component';
import { PopRemovingComponent } from '@TanglassUi/sales/components/pop-remove-dependencies/pop-removing.component';
import { PopRepairComponent } from '@TanglassUi/sales/components/pop-repair-product/pop-repair.component';
import { OrderDeliveriesComponent } from '@TanglassUi/sales/components/order-deliveries/order-deliveries.component';
import { PopQuotationTransferComponent } from '@TanglassUi/sales/components/pop-quotation-transfer/pop-quotation-transfer.component';
import { InvoiceLinesComponent } from '@TanglassUi/sales/components/invoice-lines/invoice-lines.component';
import { StoreManufacturingModule } from '@tanglass-erp/store/manufacturing';
import { OrderRepairsComponent } from '@TanglassUi/sales/components/order-repairs/order-repairs.component';
import { UpdateQuotationComponent } from '@TanglassUi/sales/pages/quotation/update-quotation/update-quotation.component';
import { DimensionsComponent } from '@TanglassUi/sales/components/pop-product/glass/product-dimensions/product-dimensions.component';
import { AccessorySaleComponent } from "@TanglassUi/sales/components/pop-product/accessory/accessory-sale.component";
import { ServiceSaleComponent } from "@TanglassUi/sales/components/pop-product/service/service-sale.component";
import { GlassSaleComponent } from "@TanglassUi/sales/components/pop-product/glass/glass-sale.component";
import {PopWarningComponent  } from "@TanglassUi/sales/components/pop-warning/pop-warning.component";
import { ToastService } from '@TanglassTheme/services/toast.service';
import {EditGlassComponent} from "@TanglassUi/sales/components/pop-product/glass/edit-glass/edit-glass.component";
@NgModule({
  declarations: [
    SalesComponent,
    DraftComponent,
    UpdateQuotationComponent,
    CreateDraftComponent,
    ProductDraftComponent,
    QuotationComponent,
    OrderComponent,
    CreateOrderComponent,
    CreateQuotationComponent,
    AmountsOrderComponent,
    DeliveryListComponent,
    DeliveryAddComponent,
    DeliveryLineComponent,
    OrderCardComponent,
    InvoiceListComponent,
    InvoiceAddComponent,
    InvoiceReadyComponent,
    DeliveriesAccordionComponent,
    PopPaymentComponent,
    PaymentsComponent,
    QuotationCardComponent,
    PopRemovingComponent,
    PopRepairComponent,
    OrderDeliveriesComponent,
    PopQuotationTransferComponent,
    InvoiceLinesComponent,
    OrderRepairsComponent,
    DimensionsComponent,
    AccessorySaleComponent,
    ServiceSaleComponent,
    GlassSaleComponent,
    PopWarningComponent,
    EditGlassComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    MainAgGridModule,
    StoreSharedModule,
    StoreProductModule,
    StoreContactModule,
    StoreSalesModule,
    ManagementStateModule,
    MatSlideToggleModule,
    StoreManufacturingModule,
  ],
  providers:[ToastService]
})
export class SalesModule {}
