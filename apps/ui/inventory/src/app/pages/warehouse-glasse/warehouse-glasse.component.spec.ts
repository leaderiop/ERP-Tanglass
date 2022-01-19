import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseGlasseComponent } from './warehouse-glasse.component';

describe('SalePointsComponent', () => {
  let component: WarehouseGlasseComponent;
  let fixture: ComponentFixture<WarehouseGlasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseGlasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseGlasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
