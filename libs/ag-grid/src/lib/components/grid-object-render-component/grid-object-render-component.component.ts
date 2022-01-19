import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-grid-object-render-component',
  template: `<a  (click)="navigate()">{{ linkText }}</a>`,
  styleUrls: ['./grid-object-render-component.component.scss']
})
export class GridObjectRenderComponentComponent implements ICellRendererAngularComp {
  public link: string;
  public linkText: string;
  public Id;
  constructor(private router: Router) { }


  agInit(params: ICellRendererParams): void {
    if (params.data) {
      this.linkText = params.value.linkText;
      this.link = params.value.link;
      this.Id = params.data.id;
    }
  }

  refresh(params: any): boolean {
    return false;
  }

  navigate() {
    this.router.navigate([this.link, this.Id], );
  }

}
