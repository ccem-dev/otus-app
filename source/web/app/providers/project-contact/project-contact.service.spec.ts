import { TestBed } from '@angular/core/testing';

import { ProjectContactService } from './project-contact.service';

describe('ProjectContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectContactService = TestBed.get(ProjectContactService);
    expect(service).toBeTruthy();
  });
});
