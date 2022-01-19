import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductCardComponent } from './customer-product-card.component';

describe('CustomerProductCardComponent', () => {
  let component: CustomerProductCardComponent;
  let fixture: ComponentFixture<CustomerProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
