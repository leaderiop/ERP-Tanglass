import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MainGridComponent } from './components/main-grid/main-grid.component';
import { MatEditComponent } from './components/cell-renderers/mat-edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from '@tanglass-erp/material';
import 'ag-grid-enterprise';
import { ExportBottomSheetComponent } from './components/export-bottom-sheet/export-bottom-sheet.component';
import { LinkComponent } from './components/cell-renderers/link.component';
import { RouterModule } from '@angular/router';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { MatTabsModule } from '@angular/material/tabs';


export const MODULES = [
  MaterialModule,
  AgGridModule,
];

@NgModule({
  declarations: [MainGridComponent, MatEditComponent, ExportBottomSheetComponent, LinkComponent, DateFilterComponent],
  imports: [...MODULES, AgGridModule.withComponents(
    [MatEditComponent, LinkComponent]), RouterModule, MatTabsModule],
  exports: [...MODULES, MainGridComponent],
  providers: [DatePipe]
})
export class MainAgGridModule {

}
