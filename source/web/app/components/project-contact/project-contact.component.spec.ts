import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContactComponent } from './project-contact.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProjectContactService} from "../../providers/project-contact/project-contact.service";
import {CookieService} from "ngx-cookie-service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {MockValues} from "../../shared/mocks/mock-values";
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar, MatTooltipModule} from '@angular/material';
import {OtusToasterService} from "../../shared/services/otus-toaster.service";
import {BehaviorSubject} from "rxjs";
import {group} from "@angular/animations";

describe('ProjectContactComponent', () => {
  let component: ProjectContactComponent;
  let fixture: ComponentFixture<ProjectContactComponent>;
  let projectContactService: ProjectContactService;
  let router: Router;
  let otusToasterService: OtusToasterService;
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

  it('onSubmit method with validForm should simulate recording a Issue (ProjectContact)', function () {
    spyOn(projectContactService, "createProjectContact").and.returnValue(Mock.pcs.returnCreateProjectContact);
    spyOn(component, 'getProjectContacts')
    spyOn(component, "changeViewCallFormState").and.callThrough();
    spyOn(otusToasterService, "showMessage");
    component["projectContactForm"].patchValue({["title"]:"mockTitle"});
    component["projectContactForm"].patchValue({["text"]:"MockText"});
    component.onSubmit()
    expect(component.getProjectContacts).toHaveBeenCalledTimes(1);
    expect(component.changeViewCallFormState).toHaveBeenCalledTimes(1);
    expect(otusToasterService.showMessage).toHaveBeenCalledTimes(1);
  });

  function initializeMocks() {
    Mock = {
      pcs:
        {
          returnCreateProjectContact: new BehaviorSubject(true),
          // returnGetLastMessageNotFound: new BehaviorSubject([])
        }
    };
  }


});
