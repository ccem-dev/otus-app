import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { ProjectContactService } from './project-contact.service';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {MockValues} from "../../shared/mocks/mock-values";
import {ProjectContact} from "../../model/contact/project-contact";
import {Mock} from "protractor/built/driverProviders";
import {Observable, of} from "rxjs";
import {ProjectContactClientService} from "../rest/project-contact-client.service";

describe('ProjectContactService', () => {
  let projectContactService: ProjectContactService;
  let projectContactClientService: ProjectContactClientService
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatChipsModule, MatIconModule,RouterTestingModule, HttpClientTestingModule],
      providers: [
        ProjectContactService,
        CookieService,
        ProjectContactClientService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    projectContactService = TestBed.get(ProjectContactService)
    projectContactClientService = TestBed.get(ProjectContactClientService)
  });

  it('should create', () => {
    expect(ProjectContactService).toBeTruthy();
  });

  it('should getProjectContacts', () => {
    const spy = spyOn(projectContactClientService, "getIssues").and.returnValue(null);
    projectContactService.getProjectContacts()
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContacts()).toEqual(null)
  });

  it("should createProjectContact", ()=>{
    const mock = {

    } as ProjectContact
    const spy = spyOn(projectContactClientService, "createIssue").and.returnValue(null);
    projectContactService.createProjectContact(mock);
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.createProjectContact(mock)).toEqual(null)
  })

  it("should getProjectContactMessages", ()=>{
    const spy = spyOn(projectContactClientService, "getMessages").and.returnValue(of(MockValues.contactProject.issues[0]));
    projectContactService.getProjectContactMessages("1")
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContactMessages("1")).toEqual(MockValues.contactProject.issues[0])
  })

  it("should getLastMessage", ()=>{
    const spy = spyOn(projectContactClientService, "getLastMessage").and.returnValue(null);
    projectContactService.getLastMessage("1")
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContactMessages("1")).toEqual(null)
  })
  it("should createMessage", ()=>{
    const spy = spyOn(projectContactClientService, "getLastMessage").and.returnValue(null);
    projectContactService.getLastMessage("1")
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContactMessages("1")).toEqual(null)
  })

});
