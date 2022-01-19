import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialog, Groupfield } from '@tanglass-erp/material';
import { regConfigGlass } from '../../../utils/forms';
import { SharedFacade } from '@tanglass-erp/store/shared';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-pop-glass',
  templateUrl: './pop-glasse.component.html',
  styleUrls: ['./pop-glasse.component.scss'],
})
export class PopGlasseComponent extends FormDialog   {
  title = "Ajouter un Produit Stockable";
  listCompanies$ = this.facade.allShortCompany$
    .pipe(map(item => item.map(company => ({key: company.id, value: company.name}))
    ));

  regConfig: Groupfield[];
  constructor(
    public dialogRef: MatDialogRef<PopGlasseComponent>,
    private facade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
    super(dialogRef, data);
  }

  buildForm() {
    if (this.data?.id) {
      this.title = "Éditer Produit Stockable";
    }
    this.facade.loadAllShortCompanies();
    this.regConfig = regConfigGlass(this.data, this.listCompanies$);
  }
}
