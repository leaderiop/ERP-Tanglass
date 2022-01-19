import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopWarehouseComponent } from './pop-warehouse.component';

describe('PopSalePointsComponent', () => {
  let component: PopWarehouseComponent;
  let fixture: ComponentFixture<PopWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
