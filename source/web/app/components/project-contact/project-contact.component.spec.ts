import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectContactComponent} from './project-contact.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProjectContactService} from "../../providers/project-contact/project-contact.service";
import {CookieService} from "ngx-cookie-service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {MockValues} from "../../shared/mocks/mock-values";
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar, MatTooltipModule} from '@angular/material';
import {OtusToasterService} from "../../shared/services/otus-toaster.service";
import {BehaviorSubject, throwError} from "rxjs";
import {AuthenticationService} from "../../providers";

describe('ProjectContactComponent', () => {
  let component: ProjectContactComponent;
  let fixture: ComponentFixture<ProjectContactComponent>;
  let projectContactService: ProjectContactService;
  let router: Router;
  let otusToasterService: OtusToasterService;
  let authencationService: AuthenticationService;
  let Mock: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectContactComponent],
      imports: [
        MatChipsModule,
        MatIconModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatTooltipModule
      ],
      providers: [
        ProjectContactService,
        CookieService,
        MatSnackBar
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContactComponent);
    component = fixture.componentInstance;
    projectContactService = fixture.debugElement.injector.get(ProjectContactService);
    otusToasterService = fixture.debugElement.injector.get(OtusToasterService);
    authencationService = fixture.debugElement.injector.get(AuthenticationService);

    router = fixture.debugElement.injector.get(Router);
    initializeMocks();

    // @ts-ignore
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: MockValues.contactProject.issues[0]
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit should initialize attributes', function () {
    spyOn(component, "getProjectContacts");
    spyOn(authencationService.CurrentUser, "subscribe");
    component.ngOnInit();
    expect(component["networkLoading"]).toBeTrue();
    expect(component["isEmptyProjectContacts"]).toBeFalse();
    expect(component["panelOpenState"]).toBeFalse();
    expect(component["viewCallFormState"]).toBeFalse();
    expect(component["projectContactForm"]).toBeInstanceOf(FormGroup);
    expect(component.getProjectContacts).toHaveBeenCalledTimes(1);
    expect(authencationService.CurrentUser.subscribe).toHaveBeenCalledTimes(1)
  });


  it('onSubmit method with validForm should simulate recording a Issue (ProjectContact)', function () {
    spyOn(projectContactService, "createProjectContact").and.returnValue(Mock.pcs.returnCreateProjectContact);
    spyOn(component, 'getProjectContacts')
    spyOn(component, "changeViewCallFormState").and.callThrough();
    spyOn(otusToasterService, "showMessage");
    component["projectContactForm"].patchValue({["title"]: "mockTitle"});
    component["projectContactForm"].patchValue({["text"]: "MockText"});
    component.onSubmit()
    expect(component.getProjectContacts).toHaveBeenCalledTimes(1);
    expect(component.changeViewCallFormState).toHaveBeenCalledTimes(1);
    expect(otusToasterService.showMessage).toHaveBeenCalledTimes(1);
  });

  it('onSubmit method with validForm should simulate error at recording a Issue (ProjectContact)', function () {
    spyOn(projectContactService, "createProjectContact").and.callFake(Mock.pcs.returnFailCreateProjectContact);
    spyOn(component, 'getProjectContacts')
    spyOn(component, "changeViewCallFormState").and.callThrough();
    spyOn(otusToasterService, "showMessage");
    component["projectContactForm"].patchValue({["title"]: "mockTitle"});
    component["projectContactForm"].patchValue({["text"]: "MockText"});
    component.onSubmit()
    expect(component.getProjectContacts).toHaveBeenCalledTimes(0);
    expect(component.changeViewCallFormState).toHaveBeenCalledTimes(0);
    expect(otusToasterService.showMessage).toHaveBeenCalledTimes(1);
  });

  it('onSubmit method with invalidForm should not evoke createProjectContact by ProjectContactService', function () {
    spyOn(projectContactService, "createProjectContact").and.returnValue(Mock.pcs.returnCreateProjectContact);
    component.onSubmit();
    expect(projectContactService.createProjectContact).toHaveBeenCalledTimes(0);
  });

  it('getProjectContacts method should pop up a list and check the size', function () {
    spyOn(projectContactService, "getProjectContacts").and.returnValue(Mock.pcs.returnGetProjectContacts)
    component.getProjectContacts();
    expect(component["projectContacts"].length).toBe(4)
    expect(component["networkLoading"]).toBeFalse();
    expect(component["isEmptyProjectContacts"]).toBeFalse();
  });

  it('getProjectContacts method should verify empty list', function () {
    spyOn(projectContactService, "getProjectContacts").and.returnValue(Mock.pcs.returnGetEmptyProjectContacts)
    component.getProjectContacts();
    expect(component["projectContacts"].length).toBe(0)
    expect(component["networkLoading"]).toBeFalse();
    expect(component["isEmptyProjectContacts"]).toBeTrue();
  });

  function initializeMocks() {
    Mock = {
      pcs: {
        returnCreateProjectContact: new BehaviorSubject(true),
        returnFailCreateProjectContact: () => throwError(new Error('Fake error')),
        returnGetProjectContacts: new BehaviorSubject({ data: MockValues.contactProject.issues}),
        returnGetEmptyProjectContacts: new BehaviorSubject({ data:[]})
      }
    }
  }

});
