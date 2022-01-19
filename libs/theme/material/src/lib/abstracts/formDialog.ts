import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FieldConfig } from '@tanglass-erp/material';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class FormDialog implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  abstract regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //this.dialogRef.disableClose =  true;
  }

  closePopup() {
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(value: any) {
    this.dialogRef.close(value);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  abstract buildForm(): void ;

}
