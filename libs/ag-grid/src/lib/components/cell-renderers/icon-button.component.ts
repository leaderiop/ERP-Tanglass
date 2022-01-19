import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Operations } from '../../enums/operations';

@Component({
  selector: 'ngx-mat-edit',
  template: `
    <button *ngIf="params.data?true:params.group" (click)="click()" mat-icon-button [matTooltip]="params.tooltip" color="accent">
      <mat-icon>{{params.icon}}</mat-icon>
    </button>
  `,
  styles: [
  ]
})
export class IconButtonComponent implements ICellRendererAngularComp {
  params;
  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  click() {
    this.params.context.componentParent.triggerAction(Operations.update, this.params.data);
  }

  refresh(params: any): boolean {
    return false;
  }
}
