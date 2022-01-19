import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseConsumableComponent } from './warehouse-consumable.component';

describe('SalePointsComponent', () => {
  let component: WarehouseConsumableComponent;
  let fixture: ComponentFixture<WarehouseConsumableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseConsumableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseConsumableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
