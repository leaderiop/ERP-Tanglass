import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDraftComponent } from './product-draft.component';

describe('ProductDraftComponent', () => {
  let component: ProductDraftComponent;
  let fixture: ComponentFixture<ProductDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
