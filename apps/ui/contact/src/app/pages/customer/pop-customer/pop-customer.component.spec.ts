import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopCustomerComponent } from './pop-customer.component';

describe('PopSalePointsComponent', () => {
  let component: PopCustomerComponent;
  let fixture: ComponentFixture<PopCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
