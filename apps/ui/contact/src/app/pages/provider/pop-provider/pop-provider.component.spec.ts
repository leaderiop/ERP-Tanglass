import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopProviderComponent } from './pop-provider.component';

describe('PopSalePointsComponent', () => {
  let component: PopProviderComponent;
  let fixture: ComponentFixture<PopProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
