import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FieldConfig, FormDialog } from '@tanglass-erp/material';
import { regConfigCompany } from '@TanglassUi/management/utils/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@tanglass-erp/store/app';
import * as CompanieActions from '@TanglassStore/management/lib/actions/companies.actions';
import * as CompanieSelectors from '@TanglassStore/management/lib/selectors/companies.selectors';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'ngx-pop-companies',
  templateUrl: './pop-companies.component.html',
  styleUrls: ['./pop-companies.component.scss'],
})
export class PopCompaniesComponent extends FormDialog {
  title = 'Ajouter une société';
  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<PopCompaniesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) {
    super(dialogRef, data);
  }

  buildForm(): void {
    this.regConfig = regConfigCompany(this.data);
    if (!!this.data?.id) {
      this.title = 'Editer une société';
      this.store.dispatch(
        CompanieActions.loadCompanieById({ id: this.data.id })
      );
      this.store
        .select(CompanieSelectors.getSelectedCompanie)
        .pipe(
          filter((e) => !!e),
          take(1)
        )
        .subscribe((value) => {
          this.regConfig = regConfigCompany(value);
        });
    }
  }
}
