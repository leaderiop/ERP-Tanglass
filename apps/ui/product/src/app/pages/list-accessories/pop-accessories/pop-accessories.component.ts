import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialog, Groupfield } from '@tanglass-erp/material';
import { regConfigAccessory } from '../../../utils/forms';
import { AppState } from '@tanglass-erp/store/app';
import { Store } from '@ngrx/store';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-pop-glass',
  templateUrl: './pop-accessories.component.html',
  styleUrls: ['./pop-accessories.component.scss'],
})
export class PopAccessoriesComponent extends FormDialog {
  title = "Ajouter un accessoire";
  regConfig: Groupfield[];
  listCompanies = this.facade.allShortCompany$
    .pipe(map(item => item.map(company => ({ key: company.id, value: company.name })))
    );


  constructor(
    public dialogRef: MatDialogRef<PopAccessoriesComponent>,
    private facade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>

  ) {
    super(dialogRef, data);
  }

  buildForm() {
    if (this.data?.id) {
      this.title = "Éditer accessoire";
    }
    this.facade.loadAllShortCompanies();
    this.regConfig = regConfigAccessory(this.data, this.listCompanies);
  }

}
