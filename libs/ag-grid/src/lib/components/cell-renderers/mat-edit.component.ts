import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Operations } from '../../enums/operations';
import { GroupButton } from '../../interfaces/group-button';
import { MainGridComponent } from '@tanglass-erp/ag-grid';
import { ErpPermissions } from '../../interfaces/erpPermissions';

@Component({
  selector: 'ngx-mat-edit',
  template: `
    <button
      *ngIf="(params.data ? true : params.group) && permissions['update'] && params?.hideEdit!= true"
      (click)="click()"
      mat-icon-button
      matTooltip="Modifier"
      color="accent"
    >
      <mat-icon fontSet="fas" fontIcon="fa-edit"></mat-icon>
    </button>
    <ng-container *ngFor="let b of params?.extra">
      <button
        *ngIf="permissions[b.event]"
        (click)="click(b.event)"
        mat-icon-button
        [matTooltip]="b.tooltip"
        color="accent"
      >
        <mat-icon>{{ b.icon }}</mat-icon>
      </button>
    </ng-container>

  `,
  styles: [],
})
export class MatEditComponent implements ICellRendererAngularComp {
  params;
  extra: GroupButton[];
  agGrid: MainGridComponent;
  permissions: ErpPermissions;
  constructor() {}

  agInit(params: ICellRendererParams | any): void {
    this.params = params;
    this.extra = params?.extra;
    this.agGrid = <MainGridComponent>this.params.context.componentParent;
    this.permissions = this.agGrid.permissions;
  }

  click(event?) {
    this.agGrid.triggerAction(event || Operations.update, this.params.data);
  }

  hasPermission(permission) {
    return this.agGrid.permissions[permission] ?? true;
  }

  refresh(params: any): boolean {
    return false;
  }
}
