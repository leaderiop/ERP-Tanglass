import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-pop-warning',
  templateUrl: 'pop-warning.component.html',
  styleUrls: ['./pop-warning.component.scss'],
})
export class PopWarningComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public message,
  ) {}

  ngOnInit() {

  }

  close() {
    this.dialogRef.close()
  }
}
