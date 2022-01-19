import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPrinterComponent } from './order-printer.component';

describe('OrderPrinterComponent', () => {
  let component: OrderPrinterComponent;
  let fixture: ComponentFixture<OrderPrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
