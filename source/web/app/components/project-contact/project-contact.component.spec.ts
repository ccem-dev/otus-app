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

describe('ProjectContactItemComponent', () => {
  let component: ProjectContactComponent;
  let fixture: ComponentFixture<ProjectContactComponent>;
  let projectContactService: ProjectContactService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectContactComponent],
      imports: [MatChipsModule, MatIconModule,RouterTestingModule, HttpClientTestingModule],
      providers: [
        ProjectContactService,
        CookieService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContactComponent);
    component = fixture.componentInstance;
    projectContactService = fixture.debugElement.injector.get(ProjectContactService);
    router = fixture.debugElement.injector.get(Router);

    //@ts-ignore
    //spyOn(router, 'getCurrentNavigation').and.returnValue({
    //  extras: {
    //    state: MockValues.contactProject.issues[0]
    //  }
    //});
    fixture.detectChanges();
  });

  it('should create', () => {

  });
});
