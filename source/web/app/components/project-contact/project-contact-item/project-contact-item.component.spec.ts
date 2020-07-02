import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectContactItemComponent} from './project-contact-item.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {MockValues} from '../../../shared/mocks/mock-values';
import {ProjectContact} from '../../../model/contact/project-contact';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

describe('ProjectContactItemComponent', () => {
  let component: ProjectContactItemComponent;
  let fixture: ComponentFixture<ProjectContactItemComponent>;
  let projectContactService: ProjectContactService;
  let router: Router;
  let Mock: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectContactItemComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [CookieService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContactItemComponent);
    component = fixture.componentInstance;

    // @ts-ignore
    component.contactItem = MockValues.contactProject.issues[0] as ProjectContact;
    projectContactService = fixture.debugElement.injector.get(ProjectContactService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
    initializeMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadContactItemContent method should evoke methods by projectContactService', function () {
    spyOn(projectContactService, 'getLastMessage').and.returnValue(Mock.pcs.returnGetLastMessage);
    spyOn(projectContactService, 'getSender');
    spyOn(projectContactService, 'addLastMessage');
    component.loadContactItemContent(component.contactItem);
    expect(projectContactService.getLastMessage).toHaveBeenCalledTimes(1);
    expect(projectContactService.getSender).toHaveBeenCalledTimes(1);
    expect(projectContactService.getLastMessage).toHaveBeenCalledTimes(1);
  });

  it('loadContactItemContent should not evoke getSender if messages are not found', function () {
    spyOn(projectContactService, 'getLastMessage').and.returnValue(Mock.pcs.returnGetLastMessageNotFound);
    spyOn(projectContactService, 'getSender');
    spyOn(projectContactService, 'addLastMessage');
    component.loadContactItemContent(component.contactItem);
    expect(projectContactService.getLastMessage).toHaveBeenCalledTimes(1);
    expect(projectContactService.getSender).toHaveBeenCalledTimes(0);
    expect(projectContactService.getLastMessage).toHaveBeenCalledTimes(1);
  });

  it('goToMessages method should evoke navigate by Router ', function () {
    spyOn(router, 'navigate');
    component.goToMessages(component.contactItem);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  it('updateLastMessage method should ', function () {
    component.contactItem.messages = [{}];
    spyOn(projectContactService, 'getSender').and.callFake(() => {
    });
    let lastMessage = MockValues.contactProject.messages[MockValues.contactProject.messages.length - 1];
    component.updateLastMessage(lastMessage);
    expect(component.contactItem.messages[0].objectType).toBe('IssueMessage');
    //messages not isolate: reset for others tests
    component.contactItem.messages = undefined;
  });

  function initializeMocks() {
    Mock = {
      pcs:
        {
          returnGetLastMessage: new BehaviorSubject({ data:[MockValues.contactProject.messages[-1]]}),
          returnGetLastMessageNotFound: new BehaviorSubject({data:[]})
        }
    };
  }
});
