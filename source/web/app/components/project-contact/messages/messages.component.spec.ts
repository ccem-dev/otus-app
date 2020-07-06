import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MessagesComponent} from './messages.component';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {MockValues} from '../../../shared/mocks/mock-values';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let projectContactService: ProjectContactService;
  let Mock = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [MatChipsModule, MatIconModule, HttpClientTestingModule],
      providers: [
        ProjectContactService,
        CookieService,
        {provide: Router, useClass: RouterStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    projectContactService = fixture.debugElement.injector.get(ProjectContactService);
    fixture.detectChanges();
    initializeMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should evoke getMessage', function () {
    spyOn(component, 'getMessages');
    component.ngOnInit();
    expect(component.getMessages).toHaveBeenCalledTimes(1);
  });

  it('getMessages should to evoke two methods by projectService', () => {
    // @ts-ignore
    spyOn(projectContactService, 'getProjectContactMessages').and.returnValue(Mock.pcs.returnGetMessages);
    spyOn(projectContactService, 'getSender');
    component.getMessages();
    expect(projectContactService.getProjectContactMessages).toHaveBeenCalledTimes(1);
    expect(projectContactService.getSender).toHaveBeenCalledTimes(1);
  });

  function initializeMocks() {
    Mock = {pcs: {returnGetMessages: new BehaviorSubject([MockValues.contactProject.messages])}};
  }
});

class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: MockValues.contactProject.issues[0]
      }
    };
  }
}
