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
import {of} from "rxjs";
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
    const spy = spyOn(projectContactClientService, "getMessages").and.returnValue(null);
    projectContactService.getProjectContactMessages("1")
    expect(spy).toHaveBeenCalled()
    expect(projectContactService.getProjectContactMessages("1")).toEqual(null)
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
});
