import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesComponent} from './messages.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let projectContactService: ProjectContactService;
  let router: Router;
  let Mock;

    //console.log(projectContactService);

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
      console.log(component)
      expect(component).toBeTruthy();
    });
  })
