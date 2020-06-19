import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateMessageFormComponent} from './create-message-form.component';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OtusToasterService} from '../../../shared/services/otus-toaster.service';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatSnackBar, MatTooltipModule} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, throwError} from "rxjs";
import {MockValues} from "../../../shared/mocks/mock-values";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateMessageFormComponent', () => {
  let component: CreateMessageFormComponent;
  let fixture: ComponentFixture<CreateMessageFormComponent>;
  let projectContactService: ProjectContactService;
  let otusToasterService: OtusToasterService;
  let Mock: any = {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMessageFormComponent],
      imports: [
        ReactiveFormsModule,
        MatTooltipModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ProjectContactService,
        OtusToasterService,
        CookieService,
        MatSnackBar
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageFormComponent);
    component = fixture.componentInstance;
    component.contactItem = MockValues.contactProject.issues[0];
    projectContactService = fixture.debugElement.injector.get(ProjectContactService);
    otusToasterService = fixture.debugElement.injector.get(OtusToasterService);
    fixture.detectChanges();
    initializeMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should initialize attributes', function () {
    component.ngOnInit()
    expect(component["messageForm"]).toBeInstanceOf(FormGroup)
    expect(component["projectContactValues"].title.contactProject).toBe("Contato com o Projeto");
  });

  it('onSubmit method with validForm should simulate recording a Message', function () {
    spyOn(projectContactService, "buildMessage").and.callThrough();
    spyOn(projectContactService, "createMessage").and.returnValue(Mock.pcs.returnCreateMessage)
    spyOn(otusToasterService, "showMessage")
    spyOn(component.notifyNewMessage, "emit")
    component["messageForm"].patchValue({["text"]: "MockTest"})
    component.onSubmit();
    expect(projectContactService.buildMessage).toHaveBeenCalledTimes(1);
    expect(otusToasterService.showMessage).toHaveBeenCalledTimes(1);
    expect(component["viewMessageFormState"]).toBeTrue();
    expect(component.notifyNewMessage.emit).toHaveBeenCalledTimes(1);
  });

  it('onSubmit method with validForm should simulate error at recording a Message', function () {
    spyOn(projectContactService, "buildMessage").and.callThrough();
    spyOn(projectContactService, "createMessage").and.callFake(Mock.pcs.returnFailCreateMessage)
    spyOn(otusToasterService, "showMessage")
    spyOn(component.notifyNewMessage, "emit")
    component["messageForm"].patchValue({["text"]: "MockTest"})
    component.onSubmit();
    expect(projectContactService.buildMessage).toHaveBeenCalledTimes(1);
    expect(component["viewMessageFormState"]).toBeFalse();
    expect(component.notifyNewMessage.emit).toHaveBeenCalledTimes(0);
    expect(otusToasterService.showMessage).toHaveBeenCalledTimes(1);
  });

  it('onSubmit method with invalidForm not should evoke createMessage by ProjectContactService', function () {
    spyOn(projectContactService, "buildMessage");
    spyOn(projectContactService, "createMessage");
    component.onSubmit();
    expect(projectContactService.buildMessage).toHaveBeenCalledTimes(0);
    expect(projectContactService.createMessage).toHaveBeenCalledTimes(0);
    expect(component["viewMessageFormState"]).toBeFalse();
  });

  function initializeMocks() {
    Mock = {
      pcs: {
        returnCreateMessage: new BehaviorSubject(true),
        returnFailCreateMessage: () => throwError(new Error('Fake error'))
      }
    }
  }

});
