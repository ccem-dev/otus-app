import { TestBed } from '@angular/core/testing';

import { ProjectContactClientService } from './project-contact-client.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProjectContactClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProjectContactClientService
      ]
    })

  });

  it('should be created', () => {
    const service: ProjectContactClientService = TestBed.get(ProjectContactClientService);
    expect(service).toBeTruthy();
  });
});
