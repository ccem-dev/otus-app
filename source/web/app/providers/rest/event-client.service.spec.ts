import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {Observable, Subscriber} from "rxjs";
import {EventClientService} from "./event-client.service";

describe('EventClientService', () => {
  let service: EventClientService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        EventClientService
      ]
    }).compileComponents();
  }));

  beforeEach(()=>{
    service = TestBed.get(EventClientService);
    httpMock = TestBed.get(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should getEvents and return a subscriber", ()=>{
    service.getEvents("13125").subscribe(response => {
      expect(response).toEqual(Subscriber)
    })
  })
  it("should accomplishEvent and return a subscriber", ()=>{
    service.accomplishEvent("32152351").subscribe(response => {
      expect(response).toEqual(Subscriber)
    })
  })

});
