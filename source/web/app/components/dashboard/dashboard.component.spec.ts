import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationService, EventService} from '../../providers';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let AuthenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthenticationService', ['currentUserValue']);

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            component: DashboardComponent,
            children: [
              {
                path: 'tasks',
                component: DashboardComponent
              }
            ]
          }

        ]),
        MatSidenavModule,
        MatListModule,
        BrowserAnimationsModule
      ],
      providers: [CookieService, { provide: AuthenticationService, useValue: spy }, EventService]
    })
    .compileComponents();

    AuthenticationServiceSpy = TestBed.get(AuthenticationService);
    AuthenticationServiceSpy.currentUserValue.recruitmentNumber =  '424435153dsfsdf';
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Otus Randomization'`, () => {
    expect(component.title).toEqual('Otus Randomization');
  });

});
