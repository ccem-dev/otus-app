import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatIconModule, MatMenuModule, MatSidenav, MatSidenavContainer, MatSidenavContent, MatToolbarModule} from '@angular/material';
import {AppAlertComponent} from './components/alert/app-alert.component';
import {Router, RouterOutlet} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        HttpClientModule,
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
      ],
      declarations: [
        DashboardComponent,
        AppComponent,
        AppAlertComponent,
        MatSidenavContainer,
        MatSidenavContent
      ],
      providers: [
        CookieService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Papp');
  }));
});
