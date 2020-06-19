import {async, TestBed} from '@angular/core/testing';

import { BaseUrlResolveService } from './base-url-resolve.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";

describe('BaseUrlResolveService', () => {
  let service: BaseUrlResolveService;
  let cookieService: CookieService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      CookieService,
      BaseUrlResolveService
    ]
  }).compileComponents();
  }));

  beforeEach(()=>{
    service = TestBed.get(BaseUrlResolveService);
    cookieService = TestBed.get(CookieService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getBaseUrl', () => {
    if(cookieService.get(environment.API_URL)){
      expect(service.getBaseUrl()).toEqual(cookieService.get(environment.API_URL));
    }else{
      expect(service.getBaseUrl()).toEqual(environment.baseUrl);
    }
  })
});
