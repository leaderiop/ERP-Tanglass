import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopAddressComponent } from './pop-address.component';

describe('PopSalePointsComponent', () => {
  let component: PopAddressComponent;
  let fixture: ComponentFixture<PopAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
