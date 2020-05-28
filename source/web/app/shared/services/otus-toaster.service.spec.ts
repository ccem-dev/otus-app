import { TestBed } from '@angular/core/testing';

import { OtusToasterService } from './otus-toaster.service';

describe('OtusToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtusToasterService = TestBed.get(OtusToasterService);
    expect(service).toBeTruthy();
  });
});
