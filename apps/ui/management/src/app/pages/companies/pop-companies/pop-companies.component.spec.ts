import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopCompaniesComponent } from './pop-companies.component';

describe('PopCompaniesComponent', () => {
  let component: PopCompaniesComponent;
  let fixture: ComponentFixture<PopCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
