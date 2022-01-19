import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopSalePointsComponent } from './pop-sale-points.component';

describe('PopSalePointsComponent', () => {
  let component: PopSalePointsComponent;
  let fixture: ComponentFixture<PopSalePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopSalePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopSalePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
