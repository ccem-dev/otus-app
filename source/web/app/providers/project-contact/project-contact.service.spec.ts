import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { ProjectContactService } from './project-contact.service';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {ProjectContact} from "../../model/contact/project-contact";
import {ProjectContactClientService} from "../rest/project-contact-client.service";
import {Message} from "../../model/contact/message/message";
import {BehaviorSubject, Observable, of} from "rxjs";
import {MockValues} from "../../shared/mocks/mock-values";

describe('ProjectContactService', () => {
  let projectContactService: ProjectContactService;
  let projectContactClientService: ProjectContactClientService
  let router: Router;
  let Mock: {pcs}
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
    initializeMocks();
  });

  it('should create', () => {
    expect(ProjectContactService).toBeTruthy();
  });

  it('should getProjectContacts', () => {
    const spy = spyOn(projectContactClientService, "getIssues").and.returnValue(Mock.pcs.returnGetIssues);
    projectContactService.getProjectContacts()
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContacts()).toEqual(Mock.pcs.returnGetIssues)
  });

  it("should createProjectContact", ()=>{
    const spy = spyOn(projectContactClientService, "createIssue").and.returnValue(Mock.pcs.returnGetIssues);
    projectContactService.createProjectContact(Mock.pcs.returnGetIssues);
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.createProjectContact(Mock.pcs.returnGetIssues)).toEqual(Mock.pcs.returnGetIssues)
  })

  it("should getProjectContactMessages", ()=>{
    const spy = spyOn(projectContactClientService, "getMessages").and.returnValue(Mock.pcs.returnGetMessages[0]);
    projectContactService.getProjectContactMessages("1")
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContactMessages("1")).toEqual(Mock.pcs.returnGetMessages[0])
  })

  it("should getLastMessage", ()=>{
    const spy = spyOn(projectContactClientService, "getLastMessage").and.returnValue(null);
    projectContactService.getLastMessage("1")
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getLastMessage("1")).toEqual(null)
  })
  it("should createMessage", ()=>{
    const spy = spyOn(projectContactClientService, "createMessage").and.returnValue(null);
    projectContactService.createMessage("1", new Message("ok", {} as ProjectContact))
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.createMessage("1", new Message("ok", {} as ProjectContact))).toEqual(null)
  })
  it("should addLastMessage", ()=>{
    projectContactService.addLastMessage({messages: []} as ProjectContact, new Message("ok", {} as ProjectContact));
    expect(projectContactService.addLastMessage({messages: []} as ProjectContact, new Message("ok", {} as ProjectContact)))
      .toEqual(undefined);
  })
  it("should buildMessage", ()=>{
    projectContactService.buildMessage("iss", {} as ProjectContact)
    expect(projectContactService.buildMessage("iss", {} as ProjectContact)).toEqual(new Message("iss", {} as ProjectContact))
  })
  it("should getSender", ()=>{
    const spy = spyOn(projectContactClientService, "getSender").and.returnValue(of(new Message("text", {} as ProjectContact)))
    projectContactService.getSender([new Message("text", {} as ProjectContact)])
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getSender([])).toEqual(undefined);

  })

  function initializeMocks() {
    Mock = {pcs: {returnGetMessages: new BehaviorSubject([MockValues.contactProject.messages])
        ,returnGetIssues: new BehaviorSubject([MockValues.contactProject.issues])}};
  }
});
