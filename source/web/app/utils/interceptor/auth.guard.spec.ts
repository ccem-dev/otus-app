import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ErrorPageComponent} from '../../components/error-page/error-page.component';


describe('AuthGuard', () => {
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
    providers: [CookieService]
  }));

  beforeEach(() => {
    service = TestBed.get(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not activate', () => {
    const routerSpy = spyOn(service.router, 'navigate');
    expect(service.canActivate(new ActivatedRouteSnapshot(), {url: 'testUrl'} as RouterStateSnapshot)).toEqual(false);
    expect(routerSpy).toHaveBeenCalledWith(['/login'], { queryParams: Object({ returnUrl: 'testUrl' }) });
  });

  it('should activate', () => {
    const routerSpy = spyOn(service.router, 'navigate');
    spyOnProperty(service.authenticationService, 'currentUserValue').and.returnValue({});
    expect(service.canActivate(new ActivatedRouteSnapshot(), {url: 'testUrl'} as RouterStateSnapshot)).toEqual(true);
  });
});
