import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product_draft, ProductDraftFacade } from '@tanglass-erp/store/sales';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'ngx-pop-removing',
  templateUrl: 'pop-removing.component.html',
  styleUrls: ['./pop-removing.component.scss'],
})
export class PopRemovingComponent implements OnInit {
  @ViewChild('products') products: MatSelectionList;
  data: Product_draft[];
  constructor(
    public dialogRef: MatDialogRef<PopRemovingComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Product_draft,
    private facade: ProductDraftFacade
  ) {}

  ngOnInit() {
    this.data = this.facade.getDependencies(this.row?.glass_draft?.id);
  }

  delete() {
    this.facade.removeProducts(
      this.products.selectedOptions.selected.map((obj) => obj.value.id)
    );
  }
}
