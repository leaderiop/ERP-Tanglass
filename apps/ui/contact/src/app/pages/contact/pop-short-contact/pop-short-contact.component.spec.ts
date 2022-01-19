import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopShortContactComponent } from './pop-short-contact.component';

describe('PopSalePointsComponent', () => {
  let component: PopShortContactComponent;
  let fixture: ComponentFixture<PopShortContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopShortContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopShortContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
