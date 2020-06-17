import { TestBed } from '@angular/core/testing';

import { BaseUrlResolveService } from './base-url-resolve.service';

describe('BaseUrlResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseUrlResolveService = TestBed.get(BaseUrlResolveService);
    expect(service).toBeTruthy();
  });
});
