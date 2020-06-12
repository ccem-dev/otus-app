import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateMessageFormComponent} from './create-message-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OtusToasterService} from '../../../shared/services/otus-toaster.service';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatSnackBar, MatTooltipModule} from '@angular/material';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

describe('CreateMessageFormComponent', () => {
  let component: CreateMessageFormComponent;
  let fixture: ComponentFixture<CreateMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMessageFormComponent],
      imports: [ReactiveFormsModule, MatTooltipModule],
      providers: [
        ProjectContactService,
        OtusToasterService,
        HttpClient,
        HttpHandler,
        CookieService,
        MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component)
  });
});
