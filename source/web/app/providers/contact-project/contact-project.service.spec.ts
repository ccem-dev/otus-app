import { TestBed } from '@angular/core/testing';

import { ContactProjectService } from './contact-project.service';

describe('ContactProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactProjectService = TestBed.get(ContactProjectService);
    expect(service).toBeTruthy();
  });
});
