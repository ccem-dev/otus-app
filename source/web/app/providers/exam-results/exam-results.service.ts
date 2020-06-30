import {Injectable} from '@angular/core';
import {Report} from '../../model/exam-results/report';
import {ExamClientService} from '../rest/exam-results/exam-client.service';
import {concatMap, filter, map, mergeMap, switchMap, tap, toArray} from 'rxjs/operators';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamResultsService {

  constructor(private examClientService: ExamClientService) {
  }

  getReportByParticipant(ownerRn: string, page: number = 1): Observable<Report> {
    return this.examClientService.getReportByParticipant(ownerRn, page).pipe(
      switchMap(response => response['data']),
      concatMap(response => this.examClientService.getFullReport(ownerRn, response['_id']))
    )
  }
}
