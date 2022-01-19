import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dialog-body',
  template: `
    <mat-toolbar color="primary" class="m-0 mb-12 text-center">
      <h1 mat-dialog-title>{{title}}</h1>
    </mat-toolbar>
    <ng-content></ng-content>
  `,
  styles: [
  ]
})
export class DialogBodyComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
