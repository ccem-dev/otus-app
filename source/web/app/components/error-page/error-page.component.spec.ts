import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPageComponent } from './error-page.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ErrorPageComponent', () => {
  let component;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            component: ErrorPageComponent
          },
          {
            path: 'login',
            component: ErrorPageComponent
          }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to returnURL', () => {
    component.route.snapshot.queryParams.returnUrl = '/dashboard?test';
    component.ngOnInit();
    const  routerSpy = spyOn(component.router, 'navigate');
    component.goBack();
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
    expect(component).toBeTruthy();
  });
});
