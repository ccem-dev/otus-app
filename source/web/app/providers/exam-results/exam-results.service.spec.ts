import {async, TestBed} from '@angular/core/testing';

import {ExamResultsService} from './exam-results.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {ExamClientService} from '../rest/exam-results/exam-client.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import any = jasmine.any;
import {RouterTestingModule} from '@angular/router/testing';

// describe('ExamResultsService', () => {
//   let template-service: ExamResultsService;
//   let examClientService: ExamClientService;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [
//         ExamResultsService,
//         CookieService,
//         ExamClientService
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     template-service = TestBed.get(ExamResultsService);
//     examClientService = TestBed.get(ExamClientService);
//   });
//
//   xit('should be created', () => {
//     expect(template-service).toBeTruthy();
//   });
// });
