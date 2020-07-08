import {async, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {ExamClientService} from './exam-client.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from "rxjs";
import {Report} from "../../../model/exam-results/report";

describe('ExamResultsService', () => {
  let examClientService: ExamClientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        CookieService,
        ExamClientService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    examClientService = TestBed.get(ExamClientService);
  });

  it("should Create", () =>{
    expect(examClientService).toBeTruthy();
  })
  it("getReportByParticipant should return an list of reports", ()=>{
    examClientService.getReportByParticipant("").subscribe(report => {
      expect(report).toEqual([] as Report[])
    })
  })
  it("getReportByParticipant should return an report", ()=>{
    examClientService.getFullReport("","").subscribe(report => {
      expect(report).toEqual({} as Report)
    })
  })
  it("getTemplateReport should return an report", ()=>{
    examClientService.getTemplateReport("","").subscribe(report => {
      expect(report).toEqual({})
    })
  })
})
