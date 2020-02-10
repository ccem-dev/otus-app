import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAlertComponent } from './app-alert.component';
import {
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SubjectSubscription} from 'rxjs/internal-compatibility';
import {of} from 'rxjs';

describe('AppAlertComponent', () => {
  let component;
  let fixture;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ AppAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spy = spyOn(component.alertService, 'getAlert');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct init component', () => {
    spy.and.returnValue(of({message: {type: 'success'}}));
    component.ngOnInit();
    expect(component.subscription._subscriptions).toBeNull();
  });

  it('should alert success', () => {
    spy.and.returnValue(of({message: {type: 'success'}}));
    component.ngOnInit();
    component.alertService.success('success');
    expect(component.message.cssClass).toEqual('alert alert-success');
    expect(component.message.text).toEqual('success');
  });

  it('should alert error', () => {
    spy.and.returnValue(of({message: {type: 'error'}}));
    component.ngOnInit();
    component.alertService.error('error');
    expect(component.message.cssClass).toEqual('alert alert-danger');
    expect(component.message.text).toEqual('error');
  });

  it('should destroy component error', () => {
    spy.and.returnValue(of({message: {type: 'error'}}));
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.subscription._subscriptions).toEqual(null);
  });
});
