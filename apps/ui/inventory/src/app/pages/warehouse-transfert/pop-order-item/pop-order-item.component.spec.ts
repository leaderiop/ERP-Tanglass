import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOrderItemComponent } from './pop-order-item.component';

describe('PopSalePointsComponent', () => {
  let component: PopOrderItemComponent;
  let fixture: ComponentFixture<PopOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
