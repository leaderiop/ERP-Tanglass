import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialog, Groupfield } from '@tanglass-erp/material';
import { regConfigSupplies } from '../../../utils/forms';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-pop-supply',
  templateUrl: './pop-supplies.component.html',
  styleUrls: ['./pop-supplies.component.scss'],
})
export class PopSuppliesComponent extends FormDialog {
  title = "Ajouter une fourniture";
  regConfig: Groupfield[];
  listCompanies = this.facade.allShortCompany$
    .pipe(map(item => item.map(company => ({key: company.id, value: company.name})))
    );

  constructor(
    public dialogRef: MatDialogRef<PopSuppliesComponent>,
    private facade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    if (this.data?.id) {
      this.title = "Éditer une fourniture";

    }
    this.facade.loadAllShortCompanies();
    this.regConfig = regConfigSupplies(this.data, this.listCompanies);
  }

}
