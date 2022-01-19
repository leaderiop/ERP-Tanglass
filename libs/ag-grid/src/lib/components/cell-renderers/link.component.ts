import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ngx-ag-link',
  template: `
    <a [routerLink]="link" [state]="state">
      {{value}}
    </a>
  `,
  styles: [
  ]
})
export class LinkComponent implements ICellRendererAngularComp {
  link: string;
  value: string;
  state: any;
  constructor() { }

  agInit(params): void {
    this.link = params.link;
    this.value = params.value;
    this.state = params.state;
  }

  refresh(params: any): boolean {
    return false;
  }
}
