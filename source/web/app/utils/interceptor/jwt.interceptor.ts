import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { AuthenticationService } from '../../providers';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private cookieService: CookieService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authenticationService.authToken;
        const baseURL = this.cookieService.get(environment.API_URL) ?
          this.cookieService.get(environment.API_URL) + environment.authBasePath :
          environment.baseUrl;
        if (authToken && request.url.match(baseURL)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }
        return next.handle(request);
    }
}
