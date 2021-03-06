import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {Subscriber} from 'rxjs';
import {ActivityClientService} from './activity/activity-client.service';

describe('ActivityClientService', () => {
  let service: ActivityClientService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        ActivityClientService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ActivityClientService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getActivity', () => {
    service.getActivity('1').subscribe(response => {
      expect(response).toEqual(Subscriber);
    });
  });

});
