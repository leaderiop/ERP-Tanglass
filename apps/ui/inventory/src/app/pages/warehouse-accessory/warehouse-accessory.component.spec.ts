import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAccessoryComponent } from './warehouse-accessory.component';

describe('SalePointsComponent', () => {
  let component: WarehouseAccessoryComponent;
  let fixture: ComponentFixture<WarehouseAccessoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseAccessoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
