import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingFormComponent } from './printing-form.component';

describe('PrintingFormComponent', () => {
  let component: PrintingFormComponent;
  let fixture: ComponentFixture<PrintingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
