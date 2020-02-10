import {async, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BehaviorSubject, throwError} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { AlertService } from 'web/app/providers';
import {SanitizeHtmlPipe} from '../../../utils/sanitize-html/sanitize-html.pipe';

describe('LoginComponent', () => {
  let component;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatRadioModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [ LoginComponent, SanitizeHtmlPipe ],
      providers: [ CookieService, AlertService, SanitizeHtmlPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form', () => {
    component.ngOnInit();
    component.onSubmit();

    expect(component.f.email.hasError('required')).toEqual(true);
    expect(component.f.password.hasError('required')).toEqual(true);
    component.f.email.setValue('Test');
    component.onSubmit();
    expect(component.f.email.hasError('email')).toEqual(true);
  });

  it('should login', () => {
    const b = new BehaviorSubject([{id: 'test'}]);
    const obs = b.asObservable();
    const routerSpy = spyOn(component.router, 'navigate');
    const authenticationServiceSpy = spyOn(component.authenticationService, 'login').and.returnValue(obs);
    component.ngOnInit();
    component.f.email.setValue('Test@test.com');
    component.f.password.setValue('Test');
    component.onSubmit();
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
    expect(authenticationServiceSpy).toHaveBeenCalled();
  });

  it('should not login', () => {
    const alertServiceSpy = spyOn(component.alertService, 'error');
    const authenticationServiceSpy = spyOn(component.authenticationService, 'login').and.returnValue(throwError('test'));
    component.ngOnInit();
    component.f.email.setValue('Test@test.com');
    component.f.password.setValue('Test');
    component.onSubmit();
    expect(alertServiceSpy).toHaveBeenCalledWith('test');
    expect(authenticationServiceSpy).toHaveBeenCalled();
  });

  it('should navigate to returnURL on login', () => {
    const b = new BehaviorSubject([{id: 'test'}]);
    const obs = b.asObservable();
    const routerSpy = spyOn(component.router, 'navigate');
    const authenticationServiceSpy = spyOn(component.authenticationService, 'login').and.returnValue(obs);
    component.route.snapshot.queryParams.returnUrl = '/returnURL';
    component.ngOnInit();
    component.f.email.setValue('Test@test.com');
    component.f.password.setValue('Test');
    component.onSubmit();
    expect(routerSpy).toHaveBeenCalledWith(['/returnURL']);
    expect(authenticationServiceSpy).toHaveBeenCalled();
  });

});
