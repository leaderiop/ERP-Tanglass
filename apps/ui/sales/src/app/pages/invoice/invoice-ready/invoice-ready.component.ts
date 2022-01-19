import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { InvoiceFacade } from '@tanglass-erp/store/sales';

@Component({
  selector: 'ngx-invoice-ready',
  templateUrl: './invoice-ready.component.html',
  styleUrls: ['./invoice-ready.component.scss']
})
export class InvoiceReadyComponent implements OnInit {
  invoice$ = this.invoiceFacade.selectedInvoice$;

  constructor(private location:Location, private invoiceFacade: InvoiceFacade) { }

  ngOnInit(): void {
    const invoice_id = (<any>this.location.getState()).data.id;
    this.invoiceFacade.loadById(invoice_id);
  }

  print(invoice) {
    this.invoiceFacade.printInvoice(invoice);
  }

}
