import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromQuotation from './+state/quotation/quotation.reducer';
import { QuotationEffects } from './+state/quotation/quotation.effects';
import { QuotationFacade } from './+state/quotation/quotation.facade';
import * as fromDraft from './+state/draft/draft.reducer';
import { DraftEffects } from './+state/draft/draft.effects';
import { DraftFacade } from './+state/draft/draft.facade';
import * as fromProductDraft from './+state/product-draft/product-draft.reducer';
import { ProductDraftEffects } from './+state/product-draft/product-draft.effects';
import { ProductDraftFacade } from './+state/product-draft/product-draft.facade';
import * as fromOrders from './+state/orders/orders.reducer';
import { OrdersEffects } from './+state/orders/orders.effects';
import { OrdersFacade } from './+state/orders/orders.facade';
import * as fromDelivery from './+state/delivery/delivery.reducer';
import { DeliveryEffects } from './+state/delivery/delivery.effects';
import { DeliveryFacade } from './+state/delivery/delivery.facade';
import * as fromPayments from './+state/payments/payments.reducer';
import { PaymentsEffects } from './+state/payments/payments.effects';
import { PaymentsFacade } from './+state/payments/payments.facade';
import * as fromInvoiceinvoice from './+state/invoice/invoice.reducer';
import { InvoiceEffects } from './+state/invoice/invoice.effects';
import { InvoiceFacade } from './+state/invoice/invoice.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromQuotation.QUOTATION_FEATURE_KEY,
      fromQuotation.reducerQuotation
    ),
    EffectsModule.forFeature([QuotationEffects]),
    StoreModule.forFeature(fromDraft.DRAFT_FEATURE_KEY, fromDraft.reducerDraft),
    EffectsModule.forFeature([DraftEffects]),
    StoreModule.forFeature(
      fromProductDraft.PRODUCT_FEATURE_KEY,
      fromProductDraft.reducerProduct
    ),
    EffectsModule.forFeature([ProductDraftEffects]),
    StoreModule.forFeature(
      fromOrders.ORDERS_FEATURE_KEY,
      fromOrders.reducerOrder
    ),
    EffectsModule.forFeature([OrdersEffects]),
    StoreModule.forFeature(
      fromDelivery.DELIVERY_FEATURE_KEY,
      fromDelivery.reducer
    ),
    EffectsModule.forFeature([DeliveryEffects]),
    StoreModule.forFeature(
      fromPayments.PAYMENTS_FEATURE_KEY,
      fromPayments.reducerPayment
    ),
    EffectsModule.forFeature([PaymentsEffects]),
    StoreModule.forFeature(
      fromInvoiceinvoice.INVOICE_FEATURE_KEY,
      fromInvoiceinvoice.reducer
    ),
    EffectsModule.forFeature([InvoiceEffects]),
  ],
  providers: [
    QuotationFacade,
    DraftFacade,
    ProductDraftFacade,
    OrdersFacade,
    DeliveryFacade,
    PaymentsFacade,
    InvoiceFacade,
  ],
})
export class StoreSalesModule {}
