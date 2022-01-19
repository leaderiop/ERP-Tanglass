import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardConfig, Column } from '@tanglass-erp/material';
import { PopPaymentComponent } from './pop-payement/pop-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { Operations } from '@tanglass-erp/ag-grid';
import { OrdersFacade, PaymentsFacade } from '@tanglass-erp/store/sales';
import { Observable, Subscription } from 'rxjs';
import { PaymentsHeaders } from '@TanglassUi/sales/utils/grid-headers';

import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, OnDestroy {
  order_id: number | string;
  order_subscription: Subscription;
  displayedColumns: Array<Column> = PaymentsHeaders
  dataSource = [];
  payments$=this.paymentFacade.allPayments$
  amountsList: Observable<CardConfig[]>;
  withDetails: boolean = false;
  constructor(
    private dialog: MatDialog,
    private paymentFacade: PaymentsFacade,
    private orderFacade: OrdersFacade
  ) {}

  ngOnInit(): void {
    this.order_subscription = this.orderFacade.loadedOrder$.subscribe(
      (order) => (this.order_id = order?.id)
    );
    this.amountsList = this.paymentFacade.groupPaymentsByCompany().pipe(
      map((data) =>
        data.map((obj) => ({
          icon: 'attach_money',
          title: obj.company,
          subtitle: obj.amount,
          color: 'primary',
          withAction: false,
        }))
      )
    );
    this.payments$.subscribe(
      payments=>this.dataSource=payments
    )
  }

  openDialog(action, data = {}) {
    const dialogRef = this.dialog.open(PopPaymentComponent, {
      width: '1000px',
      panelClass: 'panel-dialog',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Store action dispatching
        if (action === Operations.add) {
          this.paymentFacade.addPayment({ ...result, order_id: this.order_id });
        } else {
        }
        // Update
      }
    });
  }
  ngOnDestroy() {
    this.order_subscription.unsubscribe();
  }

}
