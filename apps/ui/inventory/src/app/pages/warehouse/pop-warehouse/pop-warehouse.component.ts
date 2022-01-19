import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigWarehouse } from '@TanglassUi/inventory/utils/forms';
import * as ShortCompanieSelectors from '@TanglassStore/shared/lib/+state/company/short-company.selectors';
import * as ShortCompanieActions from '@TanglassStore/shared/lib/+state/company/short-company.actions';
import * as shortSalePointActions from '@TanglassStore/shared/lib/+state/salePoint/short-salePoint.actions';
import * as shortSalePointSelectors from '@TanglassStore/shared/lib/+state/salePoint/short-salePoint.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Component({
  selector: 'ngx-pop-sale-points',
  templateUrl: './pop-warehouse.component.html',
  styleUrls: ['./pop-warehouse.component.scss'],
})
export class PopWarehouseComponent extends FormDialog {

  regConfig: FieldConfig[];
  companies$ = this.store.select(ShortCompanieSelectors.getAllShortCompany);
  salePoints$ = this.store.select(shortSalePointSelectors.getAllShortSalePoint);

  constructor(
    public dialogRef: MatDialogRef<PopWarehouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
    super(dialogRef, data);
  }
  ngOnInit(): void {
    this.store.dispatch(ShortCompanieActions.loadShortCompany())
    this.store.dispatch(shortSalePointActions.loadShortSalePoint({}))
    this.buildForm();
  }

  buildForm(): void {
    this.regConfig = regConfigWarehouse(this.data,
       this.companies$.pipe(map(item => item.map(company => ({key: company.id, value: company.name})))),
       this.salePoints$.pipe(map(item => item.map(company => ({key: company.id, value: company.name}))))
       );
  }
}
