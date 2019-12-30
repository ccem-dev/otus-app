// import {async, TestBed} from '@angular/core/testing';
//
// import {HttpClientModule} from '@angular/common/http';
// import {AuthenticationService} from './authentication.service';
// import {Observable} from 'rxjs';
// import {CookieService} from 'ngx-cookie-service';
//
// describe('AuthenticationService', () => {
//   let service;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientModule
//       ],
//       providers: [CookieService]
//     });
//   }));
//
//   it('should be created', () => {
//     service = TestBed.get(AuthenticationService);
//     expect(service).toBeTruthy();
//   });
//
//   it('should use user from localStorage', () => {
//     spyOn(localStorage, 'getItem').withArgs('currentUser').and.returnValue(JSON.stringify({
//       recruitmentNumber: '123',
//       birthdate: 'birthdate',
//       surname: 'surname',
//       email: 'email',
//       sex: 'sex',
//       name: 'name'
//     }));
//     service = TestBed.get(AuthenticationService);
//     expect(service.currentUserValue.recruitmentNumber).toEqual('123');
//     expect(service.currentUserValue.birthdate).toEqual('birthdate');
//     expect(service.currentUserValue.surname).toEqual('surname');
//     expect(service.currentUserValue.email).toEqual('email');
//     expect(service.currentUserValue.sex).toEqual('sex');
//     expect(service.currentUserValue.name).toEqual('name');
//   });
//
//   it('should set null when there is no currentUser on localStorage', () => {
//     service = TestBed.get(AuthenticationService);
//     expect(service.currentUserValue).toEqual(null);
//   });
//
//   it('should return Observable', () => {
//     service = TestBed.get(AuthenticationService);
//     expect(service.CurrentUser).toEqual(jasmine.any(Observable));
//   });
//
//   it('should call AccountClientService login', () => {
//     service = TestBed.get(AuthenticationService);
//
//     const accountClientServiceSpy = spyOn(service.currentUserSubject, 'next');
//     service.client.login = (email, password, callback) => {
//       const data = {
//         user: {},
//         token: 'token'
//       };
//       callback(data);
//     };
//     service.login('email', 'password');
//     expect(accountClientServiceSpy).toHaveBeenCalled();
//     expect(localStorage.getItem('currentUser')).toEqual('{}');
//     expect(service.authToken).toEqual('token');
//
//     expect(localStorage.setItem('currentUser', null));
//     expect(localStorage.setItem('authToken', null));
//   });
//
//   it('should logout', () => {
//     service = TestBed.get(AuthenticationService);
//     spyOn(service.client, 'logout').and.callFake((callback => callback()));
//     service.logout(() => {});
//     expect(localStorage.getItem('currentUser')).toEqual(null);
//     expect(localStorage.getItem('authToken')).toEqual(null);
//   });
//
// });
