import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { JobOrder, JobOrdersFacade, JobProduct } from '@tanglass-erp/store/manufacturing';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-job-progress',
  templateUrl: './job-progress.component.html',
  styleUrls: ['./job-progress.component.scss'],
})
export class JobProgressComponent implements OnInit, OnDestroy {
  @Input() data: JobOrder
  glass: JobProduct;
  glassDesig: string;
  dimensions: string;
  dataSub: Subscription;

  constructor(protected facade: JobOrdersFacade) {}

  ngOnInit() {
    this.dataSub = this.facade.selectedGlassLine$.pipe(filter(e => !!e)).subscribe((data) => {
      this.glass = data;
      this.glassDesig = data.product_draft.product_code + ' ' +
        data.service_drafts.map(e => e.labelFactory).join(' ');
      this.dimensions = data.product_draft.heigth + ' X ' + data.product_draft.width;
    });
  }

  updateState(itemIndex, serviceIndex) {
    const newGlass = JSON.parse(JSON.stringify(this.glass));
    const service = this.glass.manufacturing_lines[itemIndex].services[
      serviceIndex
    ];
    service.isReady
      ? (newGlass.manufacturing_lines[itemIndex].services[
          serviceIndex
        ].isReady = false)
      : (newGlass.manufacturing_lines[itemIndex].services[
          serviceIndex
        ].isReady = true);
    this.facade.updateGlassLine(newGlass);
    this.glass = newGlass;
  }

  confirm() {
    this.facade.updateManufacturingProgress(this.glass.manufacturing_lines);
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  // print() {
  //   const windowUrl = 'about:blank';
  //   const uniqueName = new Date();
  //   const windowName = 'Print' + uniqueName.getTime();
  //   const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');
  //   for(const barcode of this.barcodes) {
  //     console.log(barcode?.nativeElement)
  //     printWindow.document.write(barcode?.nativeElement.innerHTML);
  //   }
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  //   printWindow.close();
  // }
}
