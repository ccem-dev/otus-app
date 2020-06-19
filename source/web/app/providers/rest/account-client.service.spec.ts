import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {ActivityClientService} from "./activity-client.service";
import {Observable, Subscriber} from "rxjs";
import {AccountClientService} from "./account-client.service";

describe('AccountClientService', () => {
  let service: AccountClientService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        ActivityClientService
      ]
    }).compileComponents();
  }));

  beforeEach(()=>{
    service = TestBed.get(AccountClientService);
    httpMock = TestBed.get(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should login and return a subscriber", ()=>{
    const userMock = {
      email: "email@email.com",
      password: "password",
      setCurrentUser: () => {}
    }
    service.login(userMock.email, userMock.password, userMock.setCurrentUser).subscribe(response => {
      expect(response).toEqual(Subscriber)
    })
  })

  it("should logout and return a subscriber", ()=>{
    service.logout("email@email.com", ()=>{}).subscribe(response=>{
      expect(response).toEqual(Subscriber);
    })

  })

  it("should register and return a subscriber", ()=>{
    service.register("1235152315321", "1212122212").subscribe(response=>{
      expect(response).toEqual(Subscriber);
    })

  })
  it("should resetPassword and return a subscriber", ()=>{
    service.resetPassword("email@email.com").subscribe(response=>{
      expect(response).toEqual(Subscriber);
    })

  })

});
