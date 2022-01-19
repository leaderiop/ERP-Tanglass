import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePointsComponent } from './sale-points.component';

describe('SalePointsComponent', () => {
  let component: SalePointsComponent;
  let fixture: ComponentFixture<SalePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
