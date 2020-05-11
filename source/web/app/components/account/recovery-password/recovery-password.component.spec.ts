import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import {RecoveryPasswordComponent} from './recovery-password.component';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {SanitizeHtmlPipe} from '../../../utils/sanitize-html/sanitize-html.pipe';
import {CookieService} from 'ngx-cookie-service';
import {AlertService} from '../../../providers';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import 'rxjs-compat/add/observable/of';

describe('RecoveryPasswordComponent', () => {
  let component: RecoveryPasswordComponent;
  let fixture: ComponentFixture<RecoveryPasswordComponent>;

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
      providers: [CookieService, AlertService, SanitizeHtmlPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPasswordComponent);
    component = fixture.componentInstance;
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
  });

  it('should send password recovery request', function () {
    const behaviorSubject = new BehaviorSubject([{data: true}]);
    const observable = behaviorSubject.asObservable();
    const authenticationServiceSpy = spyOn(component['authenticationService'], 'recoveryPassword').and.returnValue(observable);
    component.ngOnInit();
    component.rpForm.email.setValue('mockEmail@gmail.com');
    component.onSubmit();
    expect(authenticationServiceSpy).toHaveBeenCalledTimes(1);
  });

});
