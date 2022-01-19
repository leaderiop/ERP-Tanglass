import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DraftFacade, Product_draft, ProductDraftFacade } from '@tanglass-erp/store/sales';
import { MatSelectionList } from '@angular/material/list';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-pop-repair',
  templateUrl: 'pop-repair.component.html',
  styleUrls: ['./pop-repair.component.scss'],
})
export class PopRepairComponent implements OnInit {
  @ViewChild('products') products: MatSelectionList;
  data: Product_draft[];
  countFormControl = new FormControl(this.row?.count, [
    Validators.required,
    Validators.max(this.row?.count),
    Validators.min(1),
  ]);
  constructor(
    private draft_facade: DraftFacade,
    public dialogRef: MatDialogRef<PopRepairComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Product_draft,
    private facade: ProductDraftFacade
  ) {}

  ngOnInit() {
    this.data = this.facade.getRepairingDimensions(
      [this.row, ...this.facade.getDependencies(this.row?.glass_draft?.id)],
      this.row?.count
    );
    this.countFormControl.valueChanges.subscribe((value) =>
      this.countFormControl.valid
        ? (this.data = this.facade.getRepairingDimensions(this.data, value))
        : null
    );
  }

  confirm() {
    this.facade.addBisItems(this.data);
  }
}









