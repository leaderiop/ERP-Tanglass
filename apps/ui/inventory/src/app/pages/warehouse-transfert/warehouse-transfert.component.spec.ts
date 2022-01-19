import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTransfertComponent } from './warehouse-transfert.component';

describe('SalePointsComponent', () => {
  let component: WarehouseTransfertComponent;
  let fixture: ComponentFixture<WarehouseTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
