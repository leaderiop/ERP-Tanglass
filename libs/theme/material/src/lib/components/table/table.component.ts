import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Column, ColumnType } from '../../interfaces/Column';
import { get } from 'lodash';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<T>;
  @Input() modelType: new(...args: any[]) => T;
  @Input() data = [];
  @Input() columnsToShow: Array<Column>;
  @Input() columnsToCompare;
  @Input() templates;
  @Input() withFilter: boolean = true;
  @Input() withCheckbox: boolean = true;


  @Output() select = new EventEmitter<Array<T>>();
  column_type = ColumnType;

  dataSource: MatTableDataSource<T>;

  // Selection Logic
  public selection: SelectionModel<T>;
  hide = false;
  displayedColumns: Array<any>;
  isAllSelected$: Observable<boolean>;
  indeterminate$: Observable<boolean>;


  constructor(public dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.selection = new SelectionModel<T>(allowMultiSelect, initialSelection);
    this.isAllSelected$ =
      this.selection.changed.pipe(map(_ => {
        this.select.emit(this.selection.selected);
        return this.selection.hasValue() && this.isAllSelected()
      }));
    this.indeterminate$ =
      this.selection.changed.pipe(map(_ => this.selection.hasValue() && !this.isAllSelected()));
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    this.withCheckbox ? this.displayedColumns = ['select', ...this.columnsToShow.map(item => item.key)]:
      this.displayedColumns = [ ...this.columnsToShow.map(item => item.key)];
    }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  getProperty(obj, key) {
    return get(obj, key);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.applyFilter('');
  }

  reassignData(data) {
    while (this.dataSource.data.length)
      this.dataSource.data.pop();
    this.dataSource.data.push(...data);
    this.updateChanges();
  }

  render() {
    this.dataSource._updateChangeSubscription();
  }

  updateChanges() {
    this.dataSource._updateChangeSubscription();
  }
}
