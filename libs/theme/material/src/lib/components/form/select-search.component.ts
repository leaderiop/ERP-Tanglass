import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { REQUIRED } from '../../../helpers/validators';

@Component({
  selector: 'app-select',
  template: `
    <mat-form-field style='width: 100%' class='demo-full-width margin-top'
                    [formGroup]='group' [hintLabel]='field.hint'>
      <mat-select [multiple]='field.multiple'
                  [placeholder]='field.label'
                  [formControlName]='field.name'
                  [(value)]='field.value'
                  [required]='field?.validations?.includes(REQUIRED)'
                  #multiSelect>
        <mat-option>
          <ngx-mat-select-search
            [formControl]='filterCtrl'
            placeholderLabel='Cherche...'
            noEntriesFoundLabel="'Aucune correspondance trouvée '">
            <mat-icon ngxMatSelectSearchClear fontSet='fas' fontIcon='fa-times'></mat-icon>
          </ngx-mat-select-search>
        </mat-option>
        <mat-option *ngFor='let item of filteredDataMulti$ | async' [value]='item.id'>
        <span optionItem *ngIf='field' [options]='field?.fieldsToShow' [item]='item'>&nbsp;
        </span>
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: []
})
export class SelectSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  field: FieldConfig;
  group: FormGroup;
  REQUIRED = REQUIRED;
  options: Array<any> = [];
  public filterCtrl: FormControl = new FormControl();
  public filteredDataMulti$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.field?.filterFields)
      this.field.filterFields = ['name', 'phone'];
    if (!this.field?.fieldsToShow)
      this.field.fieldsToShow = ['name', 'phone'];
    // listen for search field value changes
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti();
      });
    if (this.field.options instanceof Observable) {
      this.field.options
        .pipe(takeUntil(this._onDestroy))
        .subscribe(value => {
          this.options = value;
          this.filteredDataMulti$.next(this.options.slice());
        });
    } else {
      this.options = this.field.options.slice();
      this.filteredDataMulti$.next(this.options.slice());
    }

  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterMulti() {
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredDataMulti$.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDataMulti$.next(
      this.options.filter(elem => {
        for (const field of this.field.filterFields.map(res => res.split('.'))) {
          if (
            field.reduce((accum, current) => accum[current], elem).toString()
              .toLowerCase().indexOf(search) > -1
          ) return true;
        }
        return false;
      })
    );
  }

  private setInitialValue() {
    this.group.get(this.field.name).setValue(this.field.value);
    this.cdRef.detectChanges();
    // this.filteredDataMulti$
    //   .pipe(take(1), takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
    //   });
  }
}
