import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheCardComponent } from './fiche-card.component';

describe('FicheCardComponent', () => {
  let component: FicheCardComponent;
  let fixture: ComponentFixture<FicheCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
