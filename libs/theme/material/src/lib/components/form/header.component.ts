import { Component } from '@angular/core';

@Component({
  selector: "app-header",
  template: `
    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px" class="mat-h1">
      <span>{{field.label}}</span>
      <mat-divider style="border-top-color: #fcc02e" fxFlex="100"></mat-divider>
    </div>

`,
  styles: [],
})
export class HeaderComponent {
  field: any;
  constructor() {}
}
