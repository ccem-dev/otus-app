import {Injectable} from '@angular/core';
import {Report} from '../../model/exam-results/report';
import {ExamClientService} from '../rest/exam-results/exam-client.service';
import {concatMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamResultsService {

  constructor(private examClientService: ExamClientService) {
  }

  getReportByParticipant(ownerRn: string, page: number = 1): Observable<Report> {
    return this.examClientService.getReportByParticipant(ownerRn, page).pipe(
      switchMap(response => {return response['data']}),
      concatMap(response => this.examClientService.getFullReport(ownerRn, response['_id'])),
    )
  }

  getTemplateReport(ownerRn: string, reportId: string): Observable<any>{
    return this.examClientService.getTemplateReport(ownerRn, reportId)
  }
}
