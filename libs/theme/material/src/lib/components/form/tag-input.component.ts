import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: "app-tag-input",
  template: `
    <mat-form-field style="width: 100%" [formGroup]="group" [hintLabel]="field.hint">
      <mat-label>{{field.label}}</mat-label>
      <mat-chip-list #chipList>
        <mat-chip (removed)="remove(item)" *ngFor="let item of field.value" [removable]="true" [selectable]="true">
          {{displayBy ? item[displayBy] : item}}
          <mat-icon matChipRemove fontSet="fas" fontIcon="fa-times"></mat-icon>
        </mat-chip>
        <input #tagsInput
               (matChipInputTokenEnd)="add($event)"
               [formControlName]="field.name" [matAutocomplete]="auto" [matChipInputFor]="chipList"
               [matChipInputSeparatorKeyCodes]="separatorKeysCodes">
      </mat-chip-list>
      <button (click)="clear()" *ngIf="field.value?.length !== 0" mat-button mat-icon-button
              matSuffix>
        <mat-icon size="small" fontSet="fas" fontIcon="fa-times-circle"></mat-icon>
      </button>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
        <mat-option *ngFor="let item of filteredItems | async" [value]="item">
          {{displayBy ? item[displayBy] : item}}
        </mat-option>
      </mat-autocomplete>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
`,
  styles: [],
})
export class TagInputComponent implements OnInit, AfterViewInit {
  // Default
  field: FieldConfig;
  group: FormGroup;
  // For Tag input only
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  public filteredItems: Observable<any[]>;
  private control: AbstractControl;
  private displayBy: string;
  constructor() {}
  get value(): any[] {
    return this.field?.value;
  }

  set value(value: any[]) {
    this.field.value = value;
  }

  ngOnInit() {
    this.control = this.group.get(this.field.name);
    this.filteredItems = this.control.valueChanges.pipe(
      startWith(null),
      map((tag: any | null) => tag ? this._filter(tag) : this.field.options.slice()));
  }

  ngAfterViewInit(): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
    if (obj === null) {
      this.value = [];
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.field.value.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.control.setValue(null);
  }

  remove(fruit: any): void {
    const index = this.field.value.indexOf(fruit);
    if (index >= 0) {
      this.field.value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.pushTag(event.option.value);
    this.tagsInput.nativeElement.value = '';
    this.control.setValue(null);
  }

  clear(): void {
    this.field.value = [];
  }

  pushTag(tag: any): void {
    if (!this.field.value.includes(tag)) {
      this.field.value.push(tag);
    }
  }

  private _filter(value: any): string[] {
    const filterValue = (this.displayBy && value[this.displayBy] ? value[this.displayBy] : value).toLowerCase();
    if (this.displayBy) {
      return this.field.options.filter(option => option[this.displayBy].toLowerCase().includes(filterValue));
    } else {
      return this.field.options.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
}
