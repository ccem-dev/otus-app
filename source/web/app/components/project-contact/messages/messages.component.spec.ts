import {async, ComponentFixture, getTestBed, inject, TestBed} from '@angular/core/testing';
import {MessagesComponent} from './messages.component';
import {ProjectContactService} from "../../../providers/project-contact/project-contact.service";
import {RouterTestingModule} from "@angular/router/testing";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CookieService} from 'ngx-cookie-service'


describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let router: Router;
  let projectContactService: ProjectContactService

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [MatChipsModule, MatIconModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule],
      providers: [
        ProjectContactService,
        CookieService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    router.initialNavigation();
    fixture = TestBed.createComponent(MessagesComponent);
    projectContactService = fixture.debugElement.injector.get(ProjectContactService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // spyOn(projectContactService, "getProjectContactMessages").and.returnValue({})
    expect(component).toBeTruthy();
  });
});


// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {MessagesComponent} from './messages.component';
// import {MatChipsModule, MatIconModule} from '@angular/material';
// import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
// import {Router} from '@angular/router';
// import {RouterTestingModule} from '@angular/router/testing';
// import {MockValues} from "../../../shared/mocks/mock-values";
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {HttpClient} from '@angular/common/http';
// import {CookieService} from 'ngx-cookie-service';
//
// describe('MessagesComponent', () => {
//   let component: MessagesComponent;
//   let fixture: ComponentFixture<MessagesComponent>;
//   let projectContactService: ProjectContactService;
//   let router: Router;

  // beforeEach(async(() => {
  //   projectContactService = jasmine.createSpyObj(ProjectContactService, ['getProjectContactMessages'])
  //   router = jasmine.createSpyObj(Router, ['getCurrentNavigation', 'navigate'])

    // @ts-ignore
    // router.getCurrentNavigation.and.returnValue({
      // extras:{
      //   state: MockValues.contactProject.issues[0]
      // }})
    // @ts-ignore
    // projectContactService.getProjectContactMessages.and.returnValue(messagelistSubject);
    // console.log(projectContactService)


  //   TestBed.configureTestingModule({
  //     declarations: [MessagesComponent],
  //     imports: [MatChipsModule, MatIconModule, RouterTestingModule],
  //     providers: [
  //       {provide: ProjectContactService, useValue: projectContactService},
  //       {provide: Router, useValue: router },
  //     ],
  //     schemas: [CUSTOM_ELEMENTS_SCHEMA]
  //   })
  //     .compileComponents();
  // }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MessagesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
