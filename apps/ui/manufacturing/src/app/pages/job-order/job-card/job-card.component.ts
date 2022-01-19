import { Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import {
  JobItem,
  JobOrder,
  JobOrdersFacade,
} from '@tanglass-erp/store/manufacturing';
import { ModelCardComponent } from '@tanglass-erp/material';
import { ActivatedRoute } from '@angular/router';
import { HighlightDirective } from '@TanglassTheme/directives/highlight.directive';

@Component({
  selector: 'ngx-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent extends ModelCardComponent implements OnDestroy {
  data$ = this.facade.selectedJobOrder$;
  withGeneratedBarCodes$ = this.facade.withBarCodes$;
  products: JobItem[];
  @ViewChildren(HighlightDirective) cards: QueryList<HighlightDirective>;

  constructor(
    public activatedRoute: ActivatedRoute,
    protected facade: JobOrdersFacade
  ) {
    super(activatedRoute);
  }

  dispatch(): void {
    this.facade
      .adaptSelectedJobOrder()
      .subscribe((data) => (this.products = data?.items));
    this.facade.loadJobOrderById(this.id);
  }

  passData(data: JobOrder) {
    return [
      {
        label: 'Infos Générales',
        isToolbar: 'true',
        cols: 4,
        icons: [{ name: 'edit', tooltip: 'Modification', event: 'editMain' }],
        data: [
          { label: 'Réf ', value: data?.ref },
          { label: 'Date', value: data?.date, type: 'date' },
          { label: 'Order Ref.', value: data?.order_ref },
          { label: 'Status', value: [data?.status], type: 'chips' },
        ],
      },
    ];
  }
  afterComplete() {}
  print() {
    this.facade.generatePDF(this.data, this.products);
  }

  edit() {}

  generateBarCodes() {
    this.facade.addManufacturingLines();
  }

  selectProduct(product: JobItem): void {
    this.facade.setSelectedGlass(product.id);
  }
  ngOnDestroy(): void {}

  toggled($event: any) {
    this.cards
      .filter((e) => e !== $event)
      .map((e) => {
        e.active = false;
        e.toggled = false;
      });
  }
}
