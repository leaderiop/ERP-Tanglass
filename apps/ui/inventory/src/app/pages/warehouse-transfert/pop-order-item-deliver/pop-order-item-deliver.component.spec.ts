import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOrderItemDeliverComponent } from './pop-order-item-deliver.component';

describe('PopSalePointsComponent', () => {
  let component: PopOrderItemDeliverComponent;
  let fixture: ComponentFixture<PopOrderItemDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOrderItemDeliverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOrderItemDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
