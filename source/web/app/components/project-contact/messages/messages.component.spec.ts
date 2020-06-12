import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesComponent} from './messages.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let projectContactService: ProjectContactService;
  let router: Router;

  beforeEach(async(() => {
    projectContactService = jasmine.createSpyObj(jasmine.any(ProjectContactService))
    router = jasmine.createSpyObj(Router, ['getCurrentNavigation', 'navigate'])
    // @ts-ignore
    router.getCurrentNavigation.and.returnValue({extras:{}})

    console.log(router)

    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [MatChipsModule, MatIconModule, RouterTestingModule],
      providers: [
        {provide: ProjectContactService, useValue: projectContactService},
        {provide: Router, useValue: router}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
