import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../../providers';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let navigationExtras = {};
      let navigateTo;
      if (err.status === 401) {
        this.authenticationService.clearLocalStorage();
        navigateTo = ['/login'];
        this.router.navigate(['/']);
      } else if (err.status === 500) {
        navigateTo = ['/**'];
        navigationExtras = {
          queryParams: {
            returnUrl: this.router.routerState.snapshot.url,
            errorCode: 500,
            errorMessage: err.error.MESSAGE
          }
        };
      }

      if (navigateTo) {
        this.router.navigate(navigateTo, navigationExtras);
      }

      const error = (err.error && err.error.MESSAGE) || err.statusText;
      return throwError(error);
    }));
  }
}
