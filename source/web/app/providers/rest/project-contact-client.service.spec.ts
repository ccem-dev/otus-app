import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {ProjectContactClientService} from "../rest/project-contact-client.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {MockValues} from "../../shared/mocks/mock-values";

describe('projectContactClientService', () => {
  let projectContactClientService: ProjectContactClientService
  let router: Router;
  let Mock: {pcs}
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatChipsModule, MatIconModule,RouterTestingModule, HttpClientTestingModule],
      providers: [
        CookieService,
        ProjectContactClientService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    projectContactClientService = TestBed.get(ProjectContactClientService)
    httpMock = TestBed.get(HttpTestingController);
    initializeMocks();
  });

  it("component should mount", () => {
    expect(projectContactClientService).toBeTruthy();
  });

  it("getIssues should have been called and return a ProjectContact list", () => {
    projectContactClientService.getIssues(Mock.pcs.returnGetIssues).subscribe(response =>{
      expect(response).toEqual(Mock.pcs.returnGetIssues)
    })
  })
  it("createIssue should have been called and create a new Issue", () => {
    projectContactClientService.createIssue(Mock.pcs.returnGetIssues, Mock.pcs.returnGetIssues).subscribe(response =>{
      expect(response).toEqual(Mock.pcs.returnGetIssues)
    })
  })
  it("getMessages should have been called and return a Object", () => {
    projectContactClientService.getMessages(Mock.pcs.returnGetMessages).subscribe(response =>{
      expect(response).toEqual(Mock.pcs.returnGetMessages)
    })
  })
  it("getLastMessage should have been called and return a Object", () => {
    projectContactClientService.getMessages(Mock.pcs.returnGetMessages[0]).subscribe(response =>{
      expect(response).toEqual(Mock.pcs.returnGetMessages[0])
    })
  })
  it("createMessage should have been called and return a Object", () => {
    projectContactClientService.createMessage(Mock.pcs.returnGetMessages, "mess").subscribe(response =>{
      expect(response).toEqual(Mock.pcs.returnGetMessages)
    })
  })
  it("getSender should have been called and return a Object", () => {
    projectContactClientService.getSender(Mock.pcs.returnGetMessages).subscribe(response =>{
      expect(response).toEqual(Mock.pcs.returnGetMessages)
    })
  })

  function initializeMocks() {
    Mock = {pcs: {returnGetMessages: new BehaviorSubject([MockValues.contactProject.messages])
        ,returnGetIssues: new BehaviorSubject([MockValues.contactProject.issues])}};
  }
});
