import { TestBed } from '@angular/core/testing';

import { SalePointService } from './sale-point.service';

describe('SalePointService', () => {
  let service: SalePointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalePointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
