import {HttpClientModule, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {ErrorInterceptor} from './error.interceptor';
import {of, throwError} from 'rxjs';
import {createSpyObject} from '@netbasal/spectator';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CookieService} from 'ngx-cookie-service';
import {ErrorPageComponent} from '../../components/error-page/error-page.component';

describe(`ErrorInterceptor`, () => {
  let service;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ErrorPageComponent,
    ],
    imports: [
      HttpClientModule,
      RouterTestingModule.withRoutes([
        { path: 'example', component: ErrorPageComponent}
      ])
    ],
    providers: [
      ErrorInterceptor,
      CookieService
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(ErrorInterceptor);
  });



  const dummyRequest = createSpyObject(HttpRequest);


  it('should redirect when unauthorized', () => {
    const routerSpy = spyOn(service.router, 'navigate');
    const AuthenticationServiceSpy = spyOn(service.authenticationService, 'clearLocalStorage');
    service.intercept(dummyRequest, {
      handle: () => throwError(new HttpErrorResponse({status: 401 }))
    }).subscribe(
      (r) => {},
      (e) => {}
    );
    expect(AuthenticationServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should redirect on error 500', () => {
    const routerSpy = spyOn(service.router, 'navigate');
    service.router.routerState.snapshot.url = '/return';
    service.intercept(dummyRequest, {
      handle: () => throwError(new HttpErrorResponse({status: 500, error: { data: { message: 'testError'}} }))
    }).subscribe(
      (r) => {},
      (e) => {}
    );
    expect(routerSpy).toHaveBeenCalledWith(['/**'], {
      queryParams: {
        returnUrl: '/return',
        errorCode: 500,
        errorMessage: 'testError'
      }
    });
  });

  it('should throwError', () => {
    const AuthenticationServiceSpy = spyOn(service.authenticationService, 'clearLocalStorage');
    service.intercept(dummyRequest, {
      handle: () => throwError(new HttpErrorResponse({status: 402, error: { data: { message: 'testError'}}}))
    }).subscribe(
      (r) => {},
      (e) => expect(e).toEqual('testError')
    );
    expect(AuthenticationServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not redirect when OK', () => {
    const routerSpy = spyOn(service.router, 'navigate');
    const AuthenticationServiceSpy = spyOn(service.authenticationService, 'clearLocalStorage');
    service.intercept(dummyRequest, {
      handle: () => of(Response)
    }).subscribe();
    expect(AuthenticationServiceSpy).toHaveBeenCalledTimes(0);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

});
