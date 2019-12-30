import {getTestBed, TestBed} from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {AccountClientService} from './account-client.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../model';
import {CookieService} from 'ngx-cookie-service';

describe('AccountClientService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [CookieService]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: AccountClientService = TestBed.get(AccountClientService);
    expect(service).toBeTruthy();
    expect(service.login).toBeTruthy();
    expect(service.register).toBeTruthy();
  });

  it('should call login method', () => {
    const service = TestBed.get(AccountClientService);
    const b = new BehaviorSubject([{id: 'test'}]);
    const obs = b.asObservable();
    spyOn(service.http, 'post').and.returnValue(obs);
    service.login('email', 'password', () => {}).subscribe(serData => {});
    // expect(service.http.post).toHaveBeenCalledWith(`${environment.baseUrl}/login`, { email: 'email', password: 'password' });
  });

  it('should call register method', () => {
    const service = TestBed.get(AccountClientService);
    const b = new BehaviorSubject([{id: 'test'}]);
    const obs = b.asObservable();
    spyOn(service.http, 'post').and.returnValue(obs);
    const user = new User();
    user.fromJSON({
      _id: 'id',
      surname: 'surname',
      email: 'email',
      sex: 'sex',
      name: 'name',
      birthdate: 'birthdate'
    });
    service.register(user).subscribe(result => {});
    // expect(service.http.post).toHaveBeenCalledWith(`${environment.baseUrl}/create-account`,
    //   user);
  });

  it('should call logout method', () => {
    const service = TestBed.get(AccountClientService);
    const b = new BehaviorSubject([{id: 'test'}]);
    const obs = b.asObservable();
    spyOn(service.http, 'delete').and.returnValue(obs);
    service.logout( () => {});
    // expect(service.http.delete).toHaveBeenCalledWith(`${environment.baseUrl}/logout`);
  });

});
