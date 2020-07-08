// import {async, TestBed} from '@angular/core/testing';
//
// import {HttpClientModule} from '@angular/common/http';
// import {AuthenticationService} from './authentication.template-service';
// import {Observable} from 'rxjs';
// import {CookieService} from 'ngx-cookie-template-service';
//
// describe('AuthenticationService', () => {
//   let template-service;
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
//     template-service = TestBed.get(AuthenticationService);
//     expect(template-service).toBeTruthy();
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
//     template-service = TestBed.get(AuthenticationService);
//     expect(template-service.currentUserValue.recruitmentNumber).toEqual('123');
//     expect(template-service.currentUserValue.birthdate).toEqual('birthdate');
//     expect(template-service.currentUserValue.surname).toEqual('surname');
//     expect(template-service.currentUserValue.email).toEqual('email');
//     expect(template-service.currentUserValue.sex).toEqual('sex');
//     expect(template-service.currentUserValue.name).toEqual('name');
//   });
//
//   it('should set null when there is no currentUser on localStorage', () => {
//     template-service = TestBed.get(AuthenticationService);
//     expect(template-service.currentUserValue).toEqual(null);
//   });
//
//   it('should return Observable', () => {
//     template-service = TestBed.get(AuthenticationService);
//     expect(template-service.CurrentUser).toEqual(jasmine.any(Observable));
//   });
//
//   it('should call AccountClientService login', () => {
//     template-service = TestBed.get(AuthenticationService);
//
//     const accountClientServiceSpy = spyOn(template-service.currentUserSubject, 'next');
//     template-service.client.login = (email, password, callback) => {
//       const data = {
//         user: {},
//         token: 'token'
//       };
//       callback(data);
//     };
//     template-service.login('email', 'password');
//     expect(accountClientServiceSpy).toHaveBeenCalled();
//     expect(localStorage.getItem('currentUser')).toEqual('{}');
//     expect(template-service.authToken).toEqual('token');
//
//     expect(localStorage.setItem('currentUser', null));
//     expect(localStorage.setItem('authToken', null));
//   });
//
//   it('should logout', () => {
//     template-service = TestBed.get(AuthenticationService);
//     spyOn(template-service.client, 'logout').and.callFake((callback => callback()));
//     template-service.logout(() => {});
//     expect(localStorage.getItem('currentUser')).toEqual(null);
//     expect(localStorage.getItem('authToken')).toEqual(null);
//   });
//
// });
