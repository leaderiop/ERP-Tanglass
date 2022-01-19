import { MatEditComponent } from '../components/cell-renderers/mat-edit.component';
import { GridObjectRenderComponentComponent } from '../components/grid-object-render-component/grid-object-render-component.component';
import { LinkComponent } from '../components/cell-renderers/link.component';
import { dateColumnByFormatter, dateFormatter, dateTimeFormatter } from './aggrid-formatters';

export const columnTypes = (datepipe) => ({
  nonEditableColumn: { editable: false },
  textColumn: { filter: 'agTextColumnFilter' },
  editColumn: { cellRendererFramework: MatEditComponent, filter: false },
  objectColumn: {
    cellRendererFramework: GridObjectRenderComponentComponent,
    filter: true,
  },
  dateColumn: dateColumnByFormatter(dateFormatter(datepipe)),
  dateTimeColumn: dateColumnByFormatter(dateTimeFormatter(datepipe)),
  linkColumn: {
    cellRendererFramework: LinkComponent,
    filter: 'agTextColumnFilter',
  },
  numberColumn: {
    filter: 'agNumberColumnFilter',
  },
});
