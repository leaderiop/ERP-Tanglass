import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CashRegisterComponent } from '@TanglassUi/cash-register/pages/cash-register/cash-register.component';
import { MaterialModule } from '@tanglass-erp/material';
import { MainAgGridModule } from '@tanglass-erp/ag-grid';
import { StoreCashRegisterModule } from '@tanglass-erp/store/cash-register';
import { SalepointsComponent } from '@TanglassUi/cash-register/pages/salepoints/salepoints.component';
import { ExpensesGridComponent } from '@TanglassUi/cash-register/components/expenses-grid/expenses-grid.component';
import { PaymentsGridComponent } from '@TanglassUi/cash-register/components/payments-grid/payments-grid.component';
import { DialogCashboxComponent } from '@TanglassUi/cash-register/components/dialog-cashbox/dialog-cashbox.component';
import { DialogPaymentComponent } from '@TanglassUi/cash-register/components/dialog-payment/dialog-payment.component';
import { DialogExpenseComponent } from '@TanglassUi/cash-register/components/dialog-expense/dialog-expense.component';
import { StoreSharedModule } from '@tanglass-erp/store/shared';
import { StoreContactModule } from '@TanglassStore/contact/lib/store-contact.module';
import { AddPaymentComponent } from '@TanglassUi/cash-register/pages/add-payment/add-payment.component';

@NgModule({
  declarations: [
    CashRegisterComponent,
    AddPaymentComponent,
    SalepointsComponent,
    ExpensesGridComponent,
    PaymentsGridComponent,
    DialogCashboxComponent,
    DialogPaymentComponent,
    DialogExpenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'salepoints',
      },
      {
        path: 'salepoints',
        children: [
          {
            path: '',
            component: SalepointsComponent,
            data: {

            }
          },
          {
            path: ':salepoint/:cashbox',
            children:[
              {
                path: '',
                component: CashRegisterComponent,
              },
              {
                component: AddPaymentComponent,
                path: 'add-payment',
                data: {
                  title: 'Paiement',
                  breadcrumb: 'Paiement',
                }
              }
            ],
            data: {
              title: 'caisse',
              breadcrumb: '',
            }
          }
        ],
        data: {
          title: 'Points de vente',
          breadcrumb: 'Points de vente',
        },
      },

    ]),

    MaterialModule,
    MainAgGridModule,
    StoreCashRegisterModule,
    StoreContactModule,
    StoreSharedModule,
  ],
})
export class CashRegisterModule {}
