import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePointCardComponent } from './transfert-card.component';

describe('SalePointCardComponent', () => {
  let component: SalePointCardComponent;
  let fixture: ComponentFixture<SalePointCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePointCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
