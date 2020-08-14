import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamResultsComponent} from './exam-results.component';
import {MatChipsModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ExamResultsService} from "../../providers/exam-results/exam-results.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Report} from "../../model/exam-results/report";
import {TemplateService} from "./template-service/template.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {OtusToasterService} from "../../shared/services/otus-toaster.service";

describe('ExamResultsComponent', () => {
   let component: ExamResultsComponent;
   let fixture: ComponentFixture<ExamResultsComponent>;
   let examResultsService: ExamResultsService;
   let templateService = TemplateService
   let otusToasterService: OtusToasterService

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       declarations: [ExamResultsComponent],
       imports: [
         MatChipsModule,
         HttpClientTestingModule,
         MatSnackBarModule,
         NoopAnimationsModule
       ],
       providers: [
         CookieService,
         ExamResultsService,
         OtusToasterService],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
     })
       .compileComponents();
   }));

   beforeEach(() => {
     fixture = TestBed.createComponent(ExamResultsComponent);
     component = fixture.componentInstance;
     examResultsService = fixture.debugElement.injector.get(ExamResultsService);
     otusToasterService = fixture.debugElement.injector.get(OtusToasterService)
     fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

   it("On Init should call getReportByParticipant", () => {
     const spy = spyOn(component, "getReportByParticipant").and.returnValue(null)
     component.ngOnInit()
     expect(spy).toHaveBeenCalledTimes(1);
   })
  it("getReportByParticipant should call getReportByParticipant from service", () => {
     const spy = spyOn(examResultsService, "getReportByParticipant").and.returnValue(new Observable())
     component.getReportByParticipant("555");
     expect(spy).toHaveBeenCalledTimes(1);
   })
  it("onScroll should call getReportByParticipant and loading should be true", () => {
     const spy = spyOn(component, "getReportByParticipant").and.returnValue(null)
     component.onLoadMore();
     expect(component.loading).toEqual(true);
     expect(spy).toHaveBeenCalledTimes(1);
   })
  it("if report haveAllDataSources is true, onClickResult should call examResultsService", () => {
     const report = {
       template: "",
       hasAllDatasources: true
     } as Report

     const spy = spyOn(examResultsService, "getTemplateReport").and.returnValue(new Observable)
     component.onClickResult(report);
     templateService(report.template)
     expect(spy).toHaveBeenCalledTimes(1)
   })
  it("if report haveAllDataSources is false, onClickResult should call examResultsService", () => {
     const report = {
       template: "",
       hasAllDatasources: false
     } as Report

     const spy = spyOn(otusToasterService, "showMessage").and.returnValue()
     component.onClickResult(report);
     expect(spy).toHaveBeenCalledTimes(1);
   })
 });
