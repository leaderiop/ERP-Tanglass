import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldConfig } from '@tanglass-erp/material';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  template: '',
})
export abstract class PageForm implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  abstract regConfig: FieldConfig[];
  abstract data: any;
  permissions?;
  id: string;

  constructor(protected activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.dispatchActions();
  }

  abstract buildForm(): void ;
  abstract dispatchActions(): void;

  submit(value: any) {
  }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


}
