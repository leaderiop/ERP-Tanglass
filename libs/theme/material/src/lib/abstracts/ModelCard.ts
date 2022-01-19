import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: ''
})
export abstract class ModelCardComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  protected id: string;
  public passedData = [];
  abstract data$: Observable<any>;
  data: any;

  constructor(public route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }
  abstract dispatch(): void ;
  abstract passData(...options);

  ngOnInit(): void {
    this.dispatch();
    this.data$.subscribe(value => {
      this.data = value;
      this.passedData = this.passData(value);
      this.afterComplete();
    }, error => {}, () => { });
  }
  abstract afterComplete();

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
