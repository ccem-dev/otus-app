import { TestBed } from '@angular/core/testing';

import { ProjectContactClientService } from './project-contact-client.service';

describe('ProjectContactClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectContactClientService = TestBed.get(ProjectContactClientService);
    expect(service).toBeTruthy();
  });
});
