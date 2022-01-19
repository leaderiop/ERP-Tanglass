import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopGlasseComponent } from './pop-glasse.component';

describe('PopMpComponent', () => {
  let component: PopGlasseComponent;
  let fixture: ComponentFixture<PopGlasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopGlasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopGlasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
