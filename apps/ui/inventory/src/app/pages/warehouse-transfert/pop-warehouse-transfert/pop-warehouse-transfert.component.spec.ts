import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopWarehouseTransfertComponent } from './pop-warehouse-transfert.component';

describe('PopSalePointsComponent', () => {
  let component: PopWarehouseTransfertComponent;
  let fixture: ComponentFixture<PopWarehouseTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopWarehouseTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopWarehouseTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
