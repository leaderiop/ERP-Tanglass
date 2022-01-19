import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'ngx-export-bottom-sheet',
  templateUrl: './export-bottom-sheet.component.html',
  styles: ['img {height: 50px}']
})
export class ExportBottomSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ExportBottomSheetComponent>) {}

  dismiss(choice: string): void {
    this._bottomSheetRef.dismiss(choice);
    event.preventDefault();
  }

}
