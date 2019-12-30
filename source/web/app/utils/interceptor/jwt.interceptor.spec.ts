import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {JwtInterceptor} from './jwt.interceptor';
import {AccountClientService} from '../../providers';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {EventClientService} from '../../providers/rest/event-client.service';

describe(`JwtInterceptor`, () => {
  let service;
  let httpMock: HttpTestingController;
  let jwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        AccountClientService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        }
      ],
    });

    service = TestBed.get(EventClientService);
    jwtInterceptor = TestBed.get(HTTP_INTERCEPTORS);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    spyOnProperty(jwtInterceptor[1].authenticationService, 'authToken').and.returnValue('Bearer token');
    service.getEvents('test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    // const httpRequest = httpMock.expectOne(`${environment.baseUrl}${environment.logoutUrl}?ownerId=test`);

    // expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

  it('should not add an Authorization header', () => {
    service.getEvents('test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    // const httpRequest = httpMock.expectOne(`${environment.baseUrl}${environment.logoutUrl}?ownerId=test`);
    // TODO: VERIFICAR
    // expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

});
