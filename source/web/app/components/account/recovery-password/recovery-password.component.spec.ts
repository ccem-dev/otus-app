import {async, ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {RecoveryPasswordComponent} from './recovery-password.component';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {SanitizeHtmlPipe} from '../../../utils/sanitize-html/sanitize-html.pipe';
import {CookieService} from 'ngx-cookie-service';
import {AlertService, AuthenticationService} from '../../../providers';
import {Observable} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/from';
import {Router} from '@angular/router';


describe('RecoveryPasswordComponent', () => {
  let component: RecoveryPasswordComponent;
  let fixture: ComponentFixture<RecoveryPasswordComponent>;
  let authenticationService: AuthenticationService;
  let alertService: AlertService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        MatIconModule,
        BrowserDynamicTestingModule

      ],
      declarations: [RecoveryPasswordComponent, SanitizeHtmlPipe],
      providers: [AuthenticationService, CookieService, AlertService, SanitizeHtmlPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPasswordComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    alertService = TestBed.get(AlertService);
    router = TestBed.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form', function () {
    component.ngOnInit();
    component.onSubmit();
    expect(component.rpForm.email.hasError('required')).toEqual(true);
    component.rpForm.email.setValue('invalidValueEmail');
    component.onSubmit();
    expect(component.rpForm.email.hasError('email')).toEqual(true);
    fixture.destroy();
  });


  it('should send password recovery request', fakeAsync(() => {
    const promiseResolved = new Promise((resolve) => resolve({data: true}));
    spyOn(authenticationService, 'recoveryPassword').and.returnValue(Observable.from(promiseResolved));
    spyOn(alertService, 'success');
    spyOn(router, 'navigate').withArgs(['/login']);

    component.ngOnInit();
    component.rpForm.email.setValue('mockEmail@gmail.com');
    component.onSubmit();
    tick( 3000);
    expect(authenticationService.recoveryPassword).toHaveBeenCalledTimes(1);
    expect(component.loading).toBeFalse();
    expect(alertService.success).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);

    discardPeriodicTasks();
    fixture.destroy();
  }));

});
