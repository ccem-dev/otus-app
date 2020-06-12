import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesComponent} from './messages.component';
import {MatChipsModule, MatIconModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {ActivatedRoute, ExtraOptions, Navigation, Route, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {ProjectContact} from '../../../model/contact/project-contact';


describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let projectContactService: ProjectContactService;
  let router: RouterTestingModule;
  let location: Location;


  beforeEach(async(() => {
    projectContactService = jasmine.createSpyObj(jasmine.any(ProjectContactService))
    router = jasmine.createSpyObj<RouterTestingModule>( ['getCurrentNavigation'])
    //console.log(router)
    spyOn(router, 'getCurrentNavigation').and.returnValue({extras: {state:jasmine.any(ProjectContact)}});

    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [MatChipsModule, MatIconModule],
      providers: [
        {provide: ProjectContactService, useValue: projectContactService},
        // {provide: Router, useValue: router}
        {provide: Router, useClass: RouterTestingModule}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // router = TestBed.get(Router);
    // location = TestBed.get(Location);
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
