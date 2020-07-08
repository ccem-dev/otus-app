import {async, TestBed} from '@angular/core/testing';

import {ExamResultsService} from './exam-results.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {ExamClientService} from '../rest/exam-results/exam-client.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from "rxjs";
import {Report} from "../../model/exam-results/report";

describe('ExamResultsService', () => {
  let examResultsService: ExamResultsService;
  let examClientService: ExamClientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ExamResultsService,
        CookieService,
        ExamClientService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    examResultsService = TestBed.get(ExamResultsService);
    examClientService = TestBed.get(ExamClientService);
  });

  it('should be created', () => {
    expect(examResultsService).toBeTruthy();
  });

  it('getReportByParticipant should call getReportByParticipant from examClientService', () =>{
    const getReportSpy = spyOn(examClientService, "getReportByParticipant").and.returnValue(of([{label:"ok"}, {label:"ok"}]as Report[]))
    examResultsService.getReportByParticipant("55561")
    expect(getReportSpy).toHaveBeenCalledTimes(1)
  })
  it('getTemplateReport should call getTemplateReport from examClientService', () =>{
    const spy = spyOn(examClientService, "getTemplateReport").and.returnValue(of({data:""}))
    examResultsService.getTemplateReport("55561", "551515")
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
