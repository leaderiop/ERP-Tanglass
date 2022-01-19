import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialog, Groupfield } from '@tanglass-erp/material';
import { regConfigConsumable } from '../../../utils/forms';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';
import { Consumable } from '@TanglassStore/product/index';

@Component({
  selector: 'ngx-pop-glass',
  templateUrl: './pop-consumable.component.html',
  styleUrls: ['./pop-consumable.component.scss'],
})
export class PopConsumableComponent extends FormDialog {
  title = "Ajouter un consommable";
  regConfig: Groupfield[];
  listCompanies$ = this.facade.allShortCompany$
    .pipe(map(item => item.map(company => ({key: company.id, value: company.name})))
    );

  constructor(
    public dialogRef: MatDialogRef<PopConsumableComponent>,
    private facade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: Consumable,
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    if (this.data?.id) {
      this.title = "Éditer consommable/MP";

    }
    this.facade.loadAllShortCompanies();
    this.regConfig = regConfigConsumable(this.data, this.listCompanies$);
  }
}
